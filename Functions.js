//Adds the required dependencies/connections that functions.js needs to function properly.
const error = require('./Error');

//Converts the direction value to an actual direction.
const convertDirectionToChar = (Direction) => {
    switch(Direction){
        case 0: 
            return "N";
        case 1: 
            return "E";
        case 2: 
            return "S";
        case 3: 
            return "W";
        default: 
        //if the direction value isn't right, it sends an error message.
        error.message("Not a valid direction id has been given.");
    }
}

//Changes the value of the 'Current' location depending on the direction faced and whenever the location is outside of the pool's range.
const forwardHandler = (Current, Length, Direction) => {
    //If direction is south or west and the current value is above 0, it decreases current value by 1.
    if(Direction == 2 || Direction == 3){
        if(Current > 0){
            return Current - 1;
        }
        //If direction is south (2) or west (3) and the value is 0, send an error message that the path isn't within the pool size.
        error.message(`The path given isn't within the pool size.`);
    }
    //If current value + 1 isn't equal to the length, it increases current value by 1.
    //The + 1 is to go from the the most south western point to either the machine's north or east point.
    if((Current+1) != Length){
        return ++Current;
    }
    //If neither of the statements above is correct, send an error message that the path isn't within the pool size.
    error.message(`The path given isn't within the pool size.`);
}

//Turns the direction 90 degress to the left.
const turnLeftHandler = (Direction) => {
    //If the direction is facing north (value 0), it changes the value to 3, which is the value for south.
    if(Direction == 0){
        return Direction = 3;
    }
    //Else it decreases direction value by 1.
    return Direction - 1;
}

//Turns the direction 90 degress to the right.
const turnRightHandler = (Direction) => {
    //If the direction is facing south (value 3), it changes the value to 0, which is the value for north.
    if(Direction == 3){
        return Direction = 0;
    }
    //Else it increases direction value by 1.
    return ++Direction;
}

module.exports = {convertDirectionToChar, forwardHandler, turnLeftHandler, turnRightHandler}