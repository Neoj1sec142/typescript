import { gql } from "@apollo/client"


export const CreateArtist = gql`
mutation CreateArtist($name: String!, $description: String!){
    createArtist(name: $name, description: $description){
        artist{
            name
            id
            description
        }
    }
}
`
export const CreateAlbum = gql`
mutation CreateAlbum($title: String!, $artistId: ID!, $releaseDate: DateTime!){
    createAlbum(title: $title, artistId: $artistId, releaseDate: $releaseDate){
        album{
            title
            id
            artist{
                name
                id
            }
        }
    }
}
`


export const CreateSong = gql`
mutation CreateSong($title: String!, $artistId: ID!, $albumId: ID!, $trackNumber: Int!, $length: String!) {
    createSong(title: $title, artistId: $artistId, albumId: $albumId, trackNumber: $trackNumber, length: $length) {
        song {
        id
        title
        artist {
            id
            name
        }
        album {
            id
            title
        }
        trackNumber
        length
        }
    }
}
`