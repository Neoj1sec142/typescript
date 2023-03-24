import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get_query } from '../store/_actions/data'
import { getArtistDetail } from '../store/_services/query'
import { connect } from 'react-redux'

const ArtistDetail = ({get_query, data, loading, error}) => {
  const {id} = useParams()
  const [pageLoading, setpageLoading] = useState(true)
  const fetchData = () => {
    console.log(id, "ID")
    const variables = {id: id}
    const query = getArtistDetail
    get_query(query, variables)
    setpageLoading(false)
  }
  useEffect(() => {if(pageLoading) fetchData()},[])

  if(data?.artist && !loading){
    return (
      <div className='container-fluid'>
        <div className='d-flex justify-content-center'>
          <div className='row w-75 mt-3 mb-3 p-3 shadow-sm'>
            <p className='fs-3 text-center mt-2 mb-1 p-1'>{data.artist.name}
            <a href='/new-album' className='btn btn-primary w-25 float-end'>Add Album</a>
            </p>
            <p className='fs-4'>Albums:</p>
            <ul className='list-group mt-1 mb-1'>
              {data.artist.albums?.length >= 1 ? (data.artist.albums.map((item, index) => (
              <li className='list-group-item' key={index}>
                <p className='fs-4'>Album Title: {item.title}</p>
                <p className='fs-5'>Songs: </p>
                <ul>
                  {item.songs?.length >= 1 ? (item.songs.map((song, idx) => (
                  <li key={idx}>ID: {song.id} | Title: {song.title}</li>))):null}
                </ul>
              </li>))):null}
            </ul>
            <a href='/artists' className='btn btn-danger w-100 mt-2 mb-2'>Back to Artists</a>
          </div>
        </div>
      </div>
    )
  }else{ return(<div>Loading...</div> ) }
}  
const mapStateToProps = state => ({
  data: state.data.data,
  loading: state.data.loading,
  error: state.data.error
})

export default connect(mapStateToProps, {get_query})(ArtistDetail);