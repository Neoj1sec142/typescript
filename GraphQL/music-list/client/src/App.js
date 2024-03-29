import React from 'react'
import {client} from './store/_services/api'
import { ApolloProvider } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import Main from './containers/Main';
import ArtistList from './containers/ArtistList'
import SongList from './containers/SongList'
import AlbumList from './containers/AlbumList'
import ArtistDetail from './containers/ArtistDetail'
import SongDetail from './containers/SongDetail'
import AlbumDetail from './containers/AlbumDetail'
import ArtistForm from './components/ArtistForm';
import AlbumForm from './components/AlbumForm';
import SongForm from './components/SongForm';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/artists" element={<ArtistList />} />
        <Route path="/new-artist" element={<ArtistForm />} />
        <Route path="/artist/:id" element={<ArtistDetail />} />
        <Route path="/albums" element={<AlbumList />} />
        <Route path="/album/:id" element={<AlbumDetail />} />
        <Route path="/new-album" element={<AlbumForm />} />
        <Route path="/songs" element={<SongList />} />
        <Route path="/song/:id" element={<SongDetail />} />
        <Route path="/new-song" element={<SongForm />} />
      </Routes>
    </ApolloProvider>
  )
}

export default App