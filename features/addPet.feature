Feature: Pet Store API

  Scenario Outline: Successfully creating a new pet
    Given I have a pet to create with category '<categoryName>' and name '<petName>'
    When I create the pet
    Then I receive confirmation that the pet was created
    And pet category is '<categoryName>'
    And pet name is '<petName>'
    And The the pet's data was correctly saved

    Examples:
      | categoryName | petName   |
      | dog          | Fido      |
      | cat          | Max       |
      | bird         | Tweety    |
      | pig          | Piggy    |

  Scenario: Unsuccessfully creating a new pet
    Given I do not have the required data to create a new pet
    When I try to create the pet
    Then I receive the information that pet has not been created

  Scenario: Unsuccessfully adding potentially dangerous property
    Given I have a pet to create with category 'Hippo' and name 'Doughie'
    When I try to create a pet with dangerous property '<dangerousProperty>'
    Then I receive confirmation that the pet was created
    And Dangerous property has not been saved to the database