import { gql } from 'apollo-boost';
import { recipeFragments } from './fragments';


/* Recipes Queries */





/* Recipes Mutations */




/* User Queries */

export const GET_CURRENT_USER = gql`

query {
  getCurrentUser{
    username
    joinDate
    email
  }
}

`;

export const GET_USER_THOUGHTS = gql`

query($username: String!){
  getUserThoughts(username: $username){
    _id
    thoughts{
      _id
      thought{
        think
        time
      }
      createdDate
      updatedDate
      version
      tag
    }
  }
}
`;


/* Thought Mutation */



export const ADD_THOUGHT = gql`

mutation( $tag: String!,
  $thought: String!)
  {
    addThought( tag:$tag, thought: $thought)
    {
      thought{
        think
        time
      }
      tag
    }
  }
`;



export const EDIT_THOUGHT = gql`
mutation($_id: ID!,$tag: String!, $thought: String!) {
  editThought(_id: $_id, thought: $thought, tag: $tag) {
    _id
    thought{
        think
        time
      }
    tag
    version
    }
}
`;

export const DELETE_THOUGHT = gql`
mutation($_id: ID!) {
  deleteThought(_id: $_id) {
    _id
    thought{
        think
      }
    }
}
`;






/* User Mutation */



export const SIGNUP_USER = gql`

mutation($username: String!, $email: String!,
  $password: String!)
{
  signupUser(
    username: $username,
    email: $email,
    password: $password)
  {
    token
  }
}
`;


export const SIGNIN_USER = gql`
mutation($username: String!,
  $password: String!)
{
  signinUser(
    username: $username,
    password: $password)
  {
    token
  }
}
`;
