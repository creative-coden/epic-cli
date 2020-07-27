exports.checkSpecialCharacters = function checkSpecialCharacters(input) {
    if (input.match(/[!@#$%^&*(),.?":{}|<>_]/g)) {
      return "Directory names can't have special characters.";
    }
    return exports.numberCheck(input);
  };
  
  exports.numberCheck = function numberCheck(input) {
    if (input.match(/[0-9]/g)) {
      return "Directory names can't be numbers";
    }
    return exports.blankValue(input);
  };
  
  exports.blankValue = function blankValue(input) {
    if (input.trim().length === 0) {
        return 'Whoops! You did not name the directory';
    }
    return true;
  };
