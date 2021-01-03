module.exports = function(){
    return `import preprocessor from 'cypress-cucumber-preprocessor';
import coverage from '@cypress/code-coverage/task';
import babelrc from '@cypress/code-coverage/use-babelrc';
import { lighthouse, pa11y, prepareAudit } from 'cypress-audit';
import selectTestsWithGrep from 'cypress-select-tests/grep';

const { default: cucumber } = preprocessor;

export default function (on, config) {
  on('file:preprocessor', cucumber());
  on('file:preprocessor', selectTestsWithGrep(config));
  coverage(on, config);
  on('file:preprocessor', babelrc);

  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on('task', {
    lighthouse: lighthouse(lighthouseReport => {
      console.log(lighthouseReport);
    }),
    pa11y: pa11y(pa11yReport => {
      console.log(pa11yReport);
    }),
  });

  return config;
}
`
}