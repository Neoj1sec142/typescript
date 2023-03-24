import React, { useEffect, useState } from 'react'
import { getSongDetail } from '../store/_services/query'
import { DeleteSong } from '../store/_services/mutation'
import { connect } from 'react-redux'
import { get_query, delete_mutation } from '../store/_actions/data'
import { useNavigate, useParams } from 'react-router-dom'

const SongDetail = ({get_query, delete_mutation, data, loading, error}) => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [pageLoading, setPageLoading] = useState(true)
  const fetchData = () => {
    
    console.log(id, "ID")
    const variables = {id: id}
    const query = getSongDetail
    get_query(query, variables) 
    setPageLoading(false)
  }
  const removeSong = e => {
    e.preventDefault()
    const variables = {id: id}
    const query = DeleteSong
    delete_mutation(query, variables) 
    navigate('/')
  }

  useEffect(() => {if(pageLoading) fetchData()} ,[pageLoading])
  if(data?.song && !loading){
    console.log(data, "Data")
    return (
      <div className='container-fluid'>
        <div className='d-flex justify-content-center'>
          <div className='row w-75 mt-3 mb-3 p-3 shadow-sm'>
            <p className='fs-3 text-center mt-2 mb-1 p-1'>{data.song.title}
              <button onClick={e=>removeSong(e)} className='btn btn-danger w-25 float-end'>Remove Song</button>
            </p>
            <p className='fs-5'>Album: {data.song.album.title}</p>
            <p className='fs-5'>Artist: {data.song.artist.name}</p>
            <p className='fs-6'>Other Songs:</p>
            <ul>
              {data.song.artist.songs?.length >= 1 ? (data.song.artist.songs.map((item, index) => (
              <li key={index}>{item.title}</li>))):null}
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


export default connect(mapStateToProps, {get_query, delete_mutation})(SongDetail);