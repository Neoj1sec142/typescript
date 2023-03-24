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

export const getAlbumsQuery = gql`
query GetAlbums{
  albums{
    title
    id
    songs{
        title
        id
    }
    artist{
        name
        id
    }
  }
}
`
export const getArtistsQuery = gql`
query GetArtists{
  artists{
    name
    id
    songs{
        title
        id
    }
    albums{
        title
        id
    }
  }
}
`

export const getArtistDetail = gql`
query GetArtist($id: ID!) {
  artist(id: $id) {
    name
    id
    albums {
      title
      id
      songs {
        title
        id
      }
    }
  }
}
`


export const getSongDetail = gql`
query GetSong($id: ID!){
  song(id: $id){
    title
    id
    album{
      title
      id
    }
    artist{
      name
      id
      songs{
        title
      }
    }
  }
}
`
export const getAlbumDetail = gql`
query GetAlbum($id: ID!){
  album(id: $id){
    title
    id
    songs{
      title
      id
    }
    artist{
      name
      id
      songs{
        title
        id
      }
    }
  }
}
`

export const getAlbumForm = gql`
query GetArtistsNames{
  artists{
    name
    id
  }
}
`

export const getSongForm = gql`
query GetArtistAlbums{
  artists{
    name
    id
    albums{
      title
      id
      songs{
        title
      }
    }
  }
}
`