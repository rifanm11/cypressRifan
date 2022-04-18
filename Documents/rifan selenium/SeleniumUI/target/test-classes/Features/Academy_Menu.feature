Feature: feature to Academy Menu

  @Smoke
  Scenario: Open Main Menu with name Academy
    Given browser window is open
    And user navigate to url "https://stockbit.com/"
    And click menu with name "Academy"
    Then Verify title in new tab is "Stockbit Academy"
    And Verify all element Academy menu is exist
