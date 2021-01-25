module.exports = function(){
    return `import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from '@components/Home';

export function App(): React.ReactElement {
  return (
    <div>
      <Home />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
`
}