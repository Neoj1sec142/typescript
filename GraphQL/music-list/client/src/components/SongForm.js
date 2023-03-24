import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { get_query, create_mutation } from '../store/_actions/data';
import {getSongForm} from '../store/_services/query'
import {CreateSong} from '../store/_services/mutation'
import { useNavigate } from 'react-router-dom';
import {findById, time2Duration} from '../utils'

const SongForm = ({get_query, create_mutation, data, loading, error}) => {
  const navigate = useNavigate()
  const [pageLoading, setPageLoading] = useState(true)
  const [artistAlbums, setArtistAlbums] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    artistId: '',
    albumId: '',
    trackNumber: 0,
    tLength: ''
  })
  const {title, artistId, albumId, trackNumber, tLength} = formData;
  const onChange = e =>  setFormData({...formData, [e.target.name]: e.target.value})
  const onArtistChange = async e => {
    const id = e.target.value
    setFormData({...formData, artistId: id})
    const artist = await findById(data.artists, id)
    setArtistAlbums(artist.albums)
  }
  const fetchData = () => {
    get_query(getSongForm)
    setPageLoading(false)
  }
  useEffect(() => {if(pageLoading) fetchData()},[])
  const cancel = () => {
    setFormData({ title: '', artistId: '', albumId: '',
      trackNumber: 0, tLength: '0:00' })
  }
  console.log(error, "ERROR")
  const onSubmit = e => {
    e.preventDefault()
    const variables = {
      title: title,
      artistId: artistId,
      albumId: albumId,
      trackNumber: parseInt(trackNumber),
      length: tLength
    }
    console.log(variables, "variables")
    create_mutation(CreateSong, variables)
    if(window.confirm("Would you like to add another song to this album?"))
    { cancel() }else{ navigate('/') }
  }


  if(data?.artists && !pageLoading){
    return (
      <div className='container-fluid'>
          <div className='d-flex justify-content-center mt-3 mb-3 p-3'>
            <div className='row w-75 shadow-sm mb-3 mt-3 p-2'>
              <form onSubmit={e=>onSubmit(e)}>
                <div className='form-group mt-1'>
                  <select className='form-control' name='artistId' onChange={e=>onArtistChange(e)}>
                    <option>-- Select an Artist --</option>
                    {data.artists?.length >= 1 ? (data.artists.map((item, index) => (
                    <option key={index} value={item.id}>{item.name}</option>))):null}
                  </select>
                </div>
                <div className='form-group mt-1'>
                  <select className='form-control' name='albumId' onChange={e=>onChange(e)}>
                    <option>-- Select an Album --</option>
                    {artistAlbums.length >= 1 ? ( artistAlbums.map((item, idx) => (
                    <option key={idx} value={item.id}>{item.title}</option>))):
                    <option>Please Select an Artist First</option>}
                  </select>
                </div>
                <div className='form-group mt-1'>
                  <input className='form-control'
                    name='title' type='text'
                    placeholder='Name of Song:'
                    onChange={e=>onChange(e)}
                    value={title}
                  />
                </div>
                <div className='form-group mt-1'>
                  <input className='form-control'
                    name='trackNumber' type='number'
                    placeholder='Track Number:'
                    onChange={e=>onChange(e)}
                    value={trackNumber}
                  />
                </div>
                <div className='form-group mt-1'>
                  <input className='form-control'
                    name='tLength' type='time'
                    onChange={e=>onChange(e)}
                    value={tLength}
                  />
                </div>
                <button type='submit' 
                  className='btn btn-primary mt-2 mb-2 w-100'>Submit</button>
              </form>
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

export default connect(mapStateToProps, {get_query, create_mutation})(SongForm);