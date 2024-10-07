Feature: Google Search

  Scenario: Open Google and search for something
    Given I open the Google search page
    When I type "Playwright" in the search field and press Enter
    Then I should see the search results and close the browser
