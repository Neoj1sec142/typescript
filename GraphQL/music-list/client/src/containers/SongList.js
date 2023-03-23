import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {get_query} from '../store/_actions/data'
import {getSongsQuery} from '../store/_services/query'

const SongList = ({get_query, data, loading, error}) => {
  const [pageLoading, setPageLoading] = useState(true)
  const fetchData = () => {
    get_query(getSongsQuery)
    setPageLoading(false)
  }
  useEffect(() => {if(pageLoading)fetchData()},[])
  
  if(!loading && !error){
    return (
      <div className='container-fluid'>
        <div className='d-flex justify-content-center'>
          <div className='row w-75 shadow-sm p-3 mt-3 mb-3'>
            <p className='fs-3 text-center p-2'>Song List</p>
            <ul className='list-group'>
              {data.songs?.length >= 1 ? data.songs.map((item, index) => (
              <li className='list-group-item' key={index}>
                <a href={`/song/${item.id}`}>
                <p className='fs-3'>{item.title}</p>
                <p>Album: {item.album.title}</p>
                <p>Artist: {item.artist.name}</p></a>
                </li>)):null}
            </ul>
            <a href='/' className='btn btn-danger w-100 mt-2 mb-2'>Back to Home</a>
          </div>
        </div>
      </div>
    )
  }else{ return( <div>Loading...</div> ) }
}

const mapStateToProps = state => ({
  data: state.data.data,
  loading: state.data.loading,
  error: state.data.error
})

export default connect(mapStateToProps, {get_query})(SongList)