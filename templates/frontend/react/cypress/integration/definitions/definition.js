module.exports = function(){
    return `import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('I am on the homepage', () => {
  cy.visit('');
});

When('I fill the subscribe input with the "mail@gmail.com" term', term => {
  cy.get('#input-footer-email').type(term);
});

And('I click on the subscribe button', () => {
  cy.get('styled__Submit-sc-10l91w3-12 Subscribe__StyledSubmit-sc-1hdnlrs-5 irlrdX').click();
});

Then('I should be subscribe to a newsletter', bookName => {
  cy.get('div[data-testid="shoppingCart"]').contains(bookName).as('addedBook');
}); 
`
}