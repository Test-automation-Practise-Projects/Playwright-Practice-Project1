Feature: User Login

  Scenario: Successful login
    Given I am on the login page
    When I enter the username "Admin"
    And I enter the password "admin123"
    And I click the login button
    Then I should be logged in successfully
