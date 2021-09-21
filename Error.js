//Adds the required dependencies/connections that Error.js needs to function properly.
const colors = require('./Colors');

//Sends an error message depending on the value adde to the error variable.
const message = (Error) => {
    console.log(`${colors.TextRed}Error: ${Error}${colors.ResetColor}`);
    //Ends/exits the program.
    process.exit();
}

module.exports = {message}