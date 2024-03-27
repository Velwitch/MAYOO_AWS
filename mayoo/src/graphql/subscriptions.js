/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRecipe = /* GraphQL */ `
  subscription OnCreateRecipe($filter: ModelSubscriptionRecipeFilterInput) {
    onCreateRecipe(filter: $filter) {
      id
      name
      ingredients {
        image
        name
        quantity
        unit
        __typename
      }
      instructions
      category
      prepTime
      cookTime
      servings
      createdAt
      updatedAt
      authors
      __typename
    }
  }
`;
export const onUpdateRecipe = /* GraphQL */ `
  subscription OnUpdateRecipe($filter: ModelSubscriptionRecipeFilterInput) {
    onUpdateRecipe(filter: $filter) {
      id
      name
      ingredients {
        image
        name
        quantity
        unit
        __typename
      }
      instructions
      category
      prepTime
      cookTime
      servings
      createdAt
      updatedAt
      authors
      __typename
    }
  }
`;
export const onDeleteRecipe = /* GraphQL */ `
  subscription OnDeleteRecipe($filter: ModelSubscriptionRecipeFilterInput) {
    onDeleteRecipe(filter: $filter) {
      id
      name
      ingredients {
        image
        name
        quantity
        unit
        __typename
      }
      instructions
      category
      prepTime
      cookTime
      servings
      createdAt
      updatedAt
      authors
      __typename
    }
  }
`;
