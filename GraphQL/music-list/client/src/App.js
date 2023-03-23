import React from 'react'
import {client} from './store/_services/api'
import { ApolloProvider } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import Main from './containers/Main';
import ArtistDetail from './containers/ArtistDetail'
import SongDetail from './containers/SongDetail'
import AlbumDetail from './containers/AlbumDetail'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/artist/:id" element={<ArtistDetail />} />
        <Route path="/album/:id" element={<AlbumDetail />} />
        <Route path="/song/:id" element={<SongDetail />} />
      </Routes>
    </ApolloProvider>
  )
}

export default App