/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecipe = /* GraphQL */ `
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      name
      category
      image
      servings
      ingredients {
        image
        name
        quantity
        unit
        __typename
      }
      prepTime
      cookTime
      instructions
      createdAt
      updatedAt
      authors
      __typename
    }
  }
`;
export const listRecipes = /* GraphQL */ `
  query ListRecipes(
    $filter: ModelRecipeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecipes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        category
        image
        servings
        prepTime
        cookTime
        instructions
        createdAt
        updatedAt
        authors
        __typename
      }
      nextToken
      __typename
    }
  }
`;