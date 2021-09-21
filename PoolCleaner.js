//Adds the required dependencies/connections that PoolCleaner.js needs to function properly.
const readline = require('readline');
const verify = require('./Validations');
const method = require('./Functions');
const colors = require('./Colors');
const error = require('./Error');

//Creates a readline interface and binds input and output to their respective process.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Variables 
var Lx;
var Ly;

var Direction;
var Clx;
var Cly;

//Asks user to input the pool's size in x-length and y-length
const getPoolSize = () => {
    return new Promise((resolve, reject) => {
      rl.question(`Input values for pool's width and length in meters (x-width y-length):`, (Input) => {
        //Splits the input into an array and filters away any empty spaces that might've appeared in the input.
        var ArrayInput = Input.split(' ').filter(e => e);
        //Validates that the array's length is equal to the number set.
        verify.validateArrayLength(ArrayInput, 2);
        //Validates that the two values are numbers.
        Lx = verify.validatePoolSize(ArrayInput[0]);
        Ly = verify.validatePoolSize(ArrayInput[1]);
        //Returns the resolved promise value ArrayInput, we'd be stuck here if we don't resolve the promise.
        resolve(ArrayInput);
      })
    })
  }
  
  //Asks user to enter direction and start coordinates.
  const getStartLocation = () => {
    return new Promise((resolve, reject) => {
      rl.question(`Input values for the direction it will be facing(N, E, S, W) and the machine's southwestern starting position (x-width y-length): `, (Input) => {
        //Splits the input into an array and filters away any empty spaces that might've appeared in the input.
        var ArrayInput = Input.split(' ').filter(e => e);
        //Validates that the array's length is equal to the number set.
        verify.validateArrayLength(ArrayInput, 3);
        //Validates the direction and the coordinates.
        Direction = verify.validateDirection(ArrayInput[0].toUpperCase());
        Clx = verify.validateStartCoords(ArrayInput[1], Lx);
        Cly = verify.validateStartCoords(ArrayInput[2], Ly);
        //Returns the resolved promise value ArrayInput, we'd be stuck here if we don't resolve the promise.
        resolve(ArrayInput);
      })
    })
  }

  //Asks user to enter the path the machine/simulator should take.
  const getCleaningPath = () => {
    return new Promise((resolve, reject) => {
      rl.question('Input cleaning path(see commands above): ', (Input) => {
        //Validates that all characters matches a command. If something doesn't match it removes the mismatched commands.
        Input = verify.validateCleaningPath(Input);
        //Returns the resolved Input.
        resolve(Input); 
      })
    })
  }
  //Checks each character and changes the machine/simulators current direction and location by which command is entered.
  const startCleaningPath = (Path) => {
    Path.forEach(Character => {
      //Makes all characters into uppercase characters.
      switch(Character.toUpperCase()){
        case "A":
          //Checks if the direction is north or south. If it is, then it changes the Cly value.
          if(Direction == 0 || Direction == 2){
            Cly = method.forwardHandler(Cly, Ly, Direction);
            break;
          }
          //If the direction is west or east, it changes the Clx value. 
            Clx = method.forwardHandler(Clx, Lx, Direction);
            break;
        case "L":
          //Turns the machine 90 degrees to the left.
            Direction = method.turnLeftHandler(Direction);
            break;
        case "R":
          //Turns the machine 90 degrees to the right.
            Direction = method.turnRightHandler(Direction);
            break;
        default:
          //If an invalid command somehow got through the validations, it will send an error message and shut down the program.
            error.message("Invalid command found, shutting down program");
      }
    });
  }
  //Start message to give the name of the author and a description of the program. 
  const startMessage = () => {
    console.log(`${colors.TextCyan}*** Fteen 1000 simulator by Jesper Flodström ***`);
    console.log(`This software will simulate the movement of the fteen 1000.`);
    console.log(`The simulated machine is 1 meter in diameter.`);
    console.log(`The program requires you to input the pool's x-width and y-length.`);
    console.log(`The input will define the area where the simulation can move within.`);
    console.log(`It also requires you to input a direction and its southwestern coordinate (x-width and y-length).`);
    console.log(`The input will simulate the machine's southwest coordinate and in which direction it faces from the start.`);
    console.log(`It will also ask for the cleaning path it should take.`);
    console.log(`The input path will simulate where it will clean and give us a result containing the end direction and position.${colors.ResetColor}`)
  }

  //Sends a message with the available commands
  const commandsMessage = () => {
    console.log(`${colors.TextGreen}Available commands: \nA: move forward 1 meter \nL: Turn left 90 degress \nR: Turn right 90 degrees ${colors.ResetColor}`);
  }

  //Sends the result and ends the program/simulation.
  const result = () => {
    //Converts the direction value (either 0 to 3) to its specific direction (N,E,S,W).
    Direction = method.convertDirectionToChar(Direction);
    //Sends the result for the user to see.
    console.log(`${colors.TextCyan}result: ${Direction} ${Clx} ${Cly} ${colors.ResetColor}`);
    process.exit();
  }

  //Main function, connects all commands in the right order for the program to work.
  const main = async () => {
    startMessage();
    await getPoolSize();
    await getStartLocation();
    commandsMessage();
    var path = await getCleaningPath();
    startCleaningPath(path);
    result();
  }

  //Starts the main function when you type node PoolCleaner.js
  main();