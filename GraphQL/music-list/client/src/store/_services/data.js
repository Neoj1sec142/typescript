import { gql } from "@apollo/client"

export const getSongsQuery = gql`
query GetSongs{
  songs{
    title
    id
    album{
        title
    }
    artist{
        name
        id
    }
  }
}
`


