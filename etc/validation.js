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
    return exports.validateUserInput(input);
  };
  
  exports.validateUserInput = function validateUserInput(input) {
    if (input.trim().length === 0) {
        return 'Whoops! You did not name the directory';
    }
    return true;
  };

  exports.validateGithubUrl = function validateGithubUrl(input){
    let testString = /^(([A-Za-z0-9]+@|http(|s)\:\/\/)|(http(|s)\:\/\/[A-Za-z0-9]+@))([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git){1}$/;
    if(!testString.test(input)){
      return 'Please enter a valid Github URL'
    }
    return true;
  }
