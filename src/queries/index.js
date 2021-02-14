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

export const GET_USER_FILES = gql`

query($username: String!) {
  getUserFiles(username: $username) {

      uuid
      name
      size
      metaData
      processStatus
      createdDate
 
  }
}


`;


/* File Queries */

export const GET_FILE_DETAILS = gql`

query($uuid: String!) {
  getFileDetails(uuid: $uuid){
    uuid
    name
    size
    metaData
    processStatus
  }
}

`;



/* Thought Mutation */



export const ADD_FILE = gql`

mutation( $uuid: String!, $name: String!, $size: Int!,  $metaData: String!,  $uploadedBy: String!  )
  {
    addFile( uuid:$uuid, name: $name, size: $size, metaData: $metaData, uploadedBy: $uploadedBy)
    {
      uuid, name, size, uploadedBy, createdDate
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
