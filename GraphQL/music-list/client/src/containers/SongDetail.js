import React, { useEffect, useState } from 'react'
import { getSongDetail } from '../store/_services/query'
import { connect } from 'react-redux'
import { get_query } from '../store/_actions/data'
import { useParams } from 'react-router-dom'

const SongDetail = ({get_query, data, loading, error}) => {
  const {id} = useParams()
  const [pageLoading, setPageLoading] = useState(true)
  const fetchData = () => {
    
    console.log(id, "ID")
    const variables = {id: id}
    const query = getSongDetail
    get_query(query, variables) 
    setPageLoading(false)
  }
  useEffect(() => {if(pageLoading) fetchData()} ,[pageLoading])
  if(data?.song && !loading){
    console.log(data, "Data")
    return (
      <div className='container-fluid'>
        <div className='d-flex justify-content-center'>
          <div className='row w-75 mt-3 mb-3 p-3 shadow-sm'>
            <p className='fs-3 text-center mt-2 mb-1 p-1'>{data.song.title}</p>
            <p className='fs-5'>Album: {data.song.album.title}</p>
            <p className='fs-5'>Artist: {data.song.artist.name}</p>
            <p className='fs-6'>Other Songs:</p>
            <ul>
              {data.song.artist.songs?.length >= 1 ? (data.song.artist.songs.map((item, index) => (
              <li key={item.index}>{item.title}</li>))):null}
            </ul>
            <a href='/songs' className='btn btn-danger w-100 mt-2 mb-2'>Back to Songs</a>
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


export default connect(mapStateToProps, {get_query})(SongDetail);