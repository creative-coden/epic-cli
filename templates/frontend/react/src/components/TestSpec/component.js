module.exports = function () {
  return `import React from 'react';

export function Greetings(): React.ReactElement {
  return <div data-greet="greet">Hello World</div>;
}  
`;
};
