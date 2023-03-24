import React, { useState } from 'react'
import {connect} from 'react-redux'
import {create_mutation} from '../store/_actions/data'
import {CreateArtist} from '../store/_services/mutation'
import {useNavigate} from 'react-router-dom'

const ArtistForm = ({create_mutation}) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })
  const {name, description} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = e => {
    e.preventDefault()
    const variables = {
      name: name,
      description: description
    }
    create_mutation(CreateArtist, variables)
    if(window.confirm("Would you like to add albums to this artist?")){
      navigate('/new-album')
    }else{
      navigate('/artists')
    }
    
  }

  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-center mt-3 mb-3 p-3'>
        <div className='row w-75 shadow-sm mb-3 mt-3 p-2'>
          <form onSubmit={e=>onSubmit(e)}>
            <div className='form-group mt-1'>
              <input className='form-control'
                onChange={e=>onChange(e)}
                name='name' type='text' value={name} 
                placeholder='Enter Artists Name:' />
            </div>
            <div className='form-group mt-1'>
              <input className='form-control'
                onChange={e=>onChange(e)}
                name='description' type='text' value={description} 
                placeholder='Enter Artists Description:' />
            </div>
            <button type='submit' 
              className='btn btn-primary mt-2 mb-2 w-100'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default connect(null, {create_mutation})(ArtistForm)