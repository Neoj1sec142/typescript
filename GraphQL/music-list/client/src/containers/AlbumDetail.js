import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get_query } from '../store/_actions/data'
import { getAlbumDetail } from '../store/_services/query'
import { connect } from 'react-redux'

const AlbumDetail = ({get_query, data, error, loading}) => {
  const {id} = useParams()
  const [pageLoading, setPageLoading] = useState(true)
  const fetchData = () => {
    console.log(id, "ID")
    const variables = {id: id}
    const query = getAlbumDetail
    get_query(query, variables)
    setPageLoading(false)
  }
  useEffect(() => {if(pageLoading) fetchData()},[])
  if(data?.album && !loading){
    return (
      <div className='container-fluid'>
        <div className='d-flex justify-content-center'>
          <div className='row w-75 mt-3 mb-3 p-3 shadow-sm'>
            <p className='fs-3 text-center mt-2 mb-1 p-1'>{data.album.title}
              <a href='/new-song' className='btn btn-primary w-25 float-end'>Add Songs</a>
            </p>
            <p className='fs-5'>Songs: </p>
            <ul>
              {data.album.songs?.length >= 1 ? (data.album.songs.map((item, index) => (
              <li key={index}>{item.title}</li>))):null}
            </ul>
            <p className='fs-5'>Artist: {data.album.artist.name}</p>
            <p className='fs-6'>Other Songs:</p>
            <ul>
              {data.album.artist?.songs?.length >= 1 ? (data.album.artist.songs.map((item, index) => (
              <li key={index}>{item.title}</li>))):null}
            </ul>
            <a href='/albums' className='btn btn-danger w-100 mt-2 mb-2'>Back to Songs</a>
          </div>
        </div>
      </div>
    )
  }else{ return( <div>Loading....</div> ) }
}

const mapStateToProps = state => ({
  data: state.data.data,
  loading: state.data.loading,
  error: state.data.error
})

export default connect(mapStateToProps, {get_query})(AlbumDetail)

// <a href='/albums' className='btn btn-danger w-100 mt-2 mb-2'>Back to Albums</a>