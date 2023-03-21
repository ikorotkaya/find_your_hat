const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(grid) {
    this.grid = grid;
    this.locationX = 0;
    this.locationY = 0;
    // starting position of the player
    this.grid[0][0] = pathCharacter;
  }

  print() {
    this.grid.forEach((row) => {
      console.log(row.join("").toString());
    });
  }

  nextMove() {
    let input = prompt("Which way? (u,d,l,r) ");
    switch (input.toLowerCase()) {
      case "r":
        this.locationX += 1;
        break;
      case "l":
        this.locationX -= 1;
        break;
      case "d":
        this.locationY += 1;
        break;
      case "u":
        this.locationY -= 1;
        break;
      default:
        console.log(`Please use u,d,l,r.`);
    }
  }

  playGame() {
    let playing = true;

    while (playing) {
      this.print();
      this.nextMove();

      if (!this.isInBounds()) {
        console.log("Game over! You are outside the bound!");
        playing = false;
      } else if (this.isHole()) {
        console.log("Game over! You fell in a hole!");
        playing = false;
      } else if (this.isHat()) {
        console.log("You won! You've found your hat!");
        playing = false;
      } else {
        this.grid[this.locationY][this.locationX] = pathCharacter;
      }
    }
  }

  //check if the coordinates are equal to the 'hat' symbol '^'
  isHat() {
    return this.grid[this.locationY][this.locationX] === hat;
  }
  //check if the coordinates are equal to the 'hole' symbol 'O'
  isHole() {
    return this.grid[this.locationY][this.locationX] === hole;
  }

  isInBounds() {
    return (
      this.locationX >= 0 &&
      this.locationY >= 0 &&
      this.locationX < this.grid[0].length &&
      this.locationY < this.grid.length
    );
  }

  static generateField(height, width, percentage) {
    let newField = [];
    // randomly fill the field with fieldItems:
    for (let i = 0; i < height; i++) {
      newField[i] = [];
      for (let j = 0; j < width; j++) {
        if (Math.random() < percentage) {
          newField[i][j] = hole;
        } else {
          newField[i][j] = fieldCharacter;
        }
      }
    }
    // place the hat on the random position and not to the beginning of the field (not [0][0])
    newField[Math.floor(Math.random() * (height - 1)) + 1][Math.floor(Math.random() * (width - 1)) + 1] = hat;

    const dropHole = () => {
  	  let i = Math.floor(Math.random() * newField[0].length);
      let j = Math.floor(Math.random() * newField.length);

      while(newField[j][i] === hat && i !== 0 && j !== 0) {
	      i = Math.floor(Math.random() * newField[0].length);
        j = Math.floor(Math.random() * newField.length);
      }
      newField[j][i] = hole;
    }
    
    dropHole();
    return newField;
  }
}

let newField = new Field(Field.generateField(10, 6, 0.7));
newField.playGame();
