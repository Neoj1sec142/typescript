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
mutation CreateAlbum($title: String!, $artist_id: ID!, $release_date: String!){
    createAlbum(title: $title, artist_id: $artist_id, release_date: $release_date){
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
mutation CreateSong($title: String!, $artist_id: ID!, $album_id: ID!, $track_number: Int!, $length: String!) {
    createSong(title: $title, artist_id: $artist_id, album_id: $album_id, track_number: $track_number, length: $length) {
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