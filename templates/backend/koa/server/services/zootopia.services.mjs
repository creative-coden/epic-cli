module.exports = function(){
  return `const characters = [
    { id: 1, name: 'Judy Hopps' },
    { id: 2, name: 'Nick Wilde' },
    { id: 3, name: 'Cheif Bogo' },
    { id: 4, name: 'Clawhauser' },
  ];
  
  export async function fetchZootopiaServices() {
    try {
      return await characters;
    } catch (error) {
      console.log('error in zootopia service town', error);
    }
  }`
}

