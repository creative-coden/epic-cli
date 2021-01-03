module.exports = function(){
    return `import 'cypress-react-unit-test/support';
import '@cypress/code-coverage/support';
import 'cypress-react-unit-test/dist/hooks';
`
}