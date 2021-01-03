module.exports = function(){
    return `/// <reference types="cypress" />
import React from 'react';
import { mount } from 'cypress-react-unit-test';
import { Greetings } from '@components/Greetings/Greetings';

describe('<Greetings/>', function () {
  it('will load the greeting component', function () {
    mount(<Greetings />);
    cy.get('[data-greet=greet]').should('have.html', 'Hello World');
  });
});
`
}