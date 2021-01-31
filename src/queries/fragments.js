import { gql } from 'apollo-boost';

export const recipeFragments = {

    recipe: gql`
    
    fragment CompleteRecipe on Recipe {

        _id
        name
        imageUrl
        category
        description
        createdDate
        instruction
        likes
        username

    }
    
    `

}