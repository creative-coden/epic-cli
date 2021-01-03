module.exports = function(){
    return `Feature: Subscribe functionality
Scenario: Using the subscribe input
    Given I am on the homepage
    When I fill the subscribe input with the "mail@gmail.com" term
    And I click on the subscribe button
    Then I should be subscribe to a newsletter
`;
}