//Adds the required dependencies/connections that Validations.js needs to function properly.
const colors = require('./Colors');
const error = require('./Error');

//Checks if the direction is valid
const validateDirection = (Direction) => {
        switch(Direction){
            case "N": 
                return 0;
            case "E": 
                return 1;
            case "S": 
                return 2;
            case "W": 
                return 3;
            default: 
            //Send an error message if the direction isn't valid.
            error.message("No valid direction inserted");
        }
}

//Checks if the arrayInput is equal to the specified length.
const validateArrayLength = (ArrayInput, Length) => {
    if(ArrayInput.length != Length){
        //Send an error message if the ArrayInput isn't equal to the specified length.
        error.message("Too few or too many inputs added.");
    }
}

//Checks if the pool size input is an actual number.
const validatePoolSize = (Input) => {
    //If the input is a number and it's greater than 1, it returns the value as a number.
    if(Number(Input) > 1){
        return  parseInt(Input);
    }
    //Send an error message if number is below 1.
    if(Number(Input) <= 1){
        error.message("The pool size can't be 1 or below as the machine won't be able to move.");
    }
    //Send an error message if the input isn't equal to a number.
    error.message(`The value ${Input} isn't an integer.`);
}

//Checks if the start coordinate is a number
const validateStartCoords = (Input, Length) => {
    //If the input is greater or equal to 0 and the input is below or equal to the pool length, return the input as a number.
    if(Number(Input) >= 0 && Number(Input) < Length){
        return  parseInt(Input);
    }
    //If the input is greater than the pool length, return an error that we're outside of the pool's size.
    if(Number(Input) >= Length){
        error.message(`The input(${Input}) is not within the given pool size. (Remember that we're using the machine's southwest point to calculate everything)`);
    }
    //Send an error message that the input either isn't an integer or the integer is a negative numberS
    error.message(`The input(${Input}) isn't an integer or the integer is negative.`);
}

//Checks if the cleaning path commands are valid
const validateCleaningPath = (Input) => {
    //Creates an array while removing anything that isn't 'a', 'l', 'r' or 'A', 'L', 'R'. It also filters away empty spots that might've happen in the array.
    var ArrayInput = Input.replace(/[^alrALR]+/g, '').split('').filter(e => e);
    //If the arrayInput isn't equal to the input length it sends a message that it has removed x amount of invalid commands.
    if(ArrayInput.length != Input.length){
        console.log(`${colors.TextYellow}Removed ${Input.length - ArrayInput.length} invalid command(s).${colors.ResetColor}`);
        return ArrayInput;
    }
    //If the array is empty, send an error message.
    if(ArrayInput == ""){
        error.message("No path written");
    }
    return ArrayInput;
}


module.exports = {validateDirection, validatePoolSize, validateStartCoords, validateCleaningPath, validateArrayLength}