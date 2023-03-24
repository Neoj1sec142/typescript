import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { get_query, create_mutation } from '../store/_actions/data'
import {getAlbumForm} from '../store/_services/query'
import {CreateAlbum} from '../store/_services/mutation'
import { useNavigate } from 'react-router-dom'

const AlbumForm = ({get_query, create_mutation, data, loading, error}) => {
  const navigate = useNavigate()
  const [pageLoading, setPageLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    artist_id: '',
    release_date: ''
  })
  const {title, artist_id, release_date} = formData;
  const fetchData = () => {
    get_query(getAlbumForm)
    setPageLoading(false)
  }
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  useEffect(() => {if(pageLoading) fetchData()},[])
  const onSubmit = e => {
    e.preventDefault()
    const variables = {
      title: title,
      artistId: artist_id,
      releaseDate: release_date
    }
    console.log(variables, "variables")
    create_mutation(CreateAlbum, variables)
    if(window.confirm("Would you like to add albums to this artist?")){
      navigate('/new-song')
    }else{
      navigate('/albums')
    }
  }
  if(data?.artists && !pageLoading){
    return (
      <div className='container-fluid'>
        <div className='d-flex justify-content-center mt-3 mb-3 p-3'>
          <div className='row w-75 shadow-sm mb-3 mt-3 p-2'>
            <form onSubmit={e=>onSubmit(e)}>
            <div className='form-group mt-1'>
                <select className='form-control' name='artist_id' onChange={e=>onChange(e)}>
                  <option>-- Select an Artist --</option>
                  {data.artists?.length >= 1 ? (data.artists.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>))):null}
                </select>
              </div>
              <div className='form-group mt-1'>
                <input className='form-control'
                  onChange={e=>onChange(e)}
                  name='title' type='text' value={title} 
                  placeholder='Enter Albums Title:' />
              </div>
              <div className='form-group mt-1'>
                <input className='form-control'
                  onChange={e=>onChange(e)}
                  name='release_date' type='datetime-local' 
                  value={release_date}  />
              </div>
              <button type='submit' 
                className='btn btn-primary mt-2 mb-2 w-100'>Submit</button>
            </form>
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

export default connect(mapStateToProps, {get_query, create_mutation})(AlbumForm);