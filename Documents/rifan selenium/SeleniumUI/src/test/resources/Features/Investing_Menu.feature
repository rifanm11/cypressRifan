Feature: feature to Investing Home Menu

  @Smoke
  Scenario: Open Main Menu with name Investing
    Given browser window is open
    And user navigate to url "https://stockbit.com/"
    And click menu with name "Investing"
    Then Verify title is "Stockbit - Mulai Investasi Saham"
    And Verify all element Investing menu is exist
