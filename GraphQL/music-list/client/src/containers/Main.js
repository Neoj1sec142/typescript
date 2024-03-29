import React from 'react'
import { connect } from 'react-redux'

const Main = () => {
  
  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-center'>
        <div className='row w-75 shadow-sm p-3 mt-3 mb-3'>
          <div className='d-flex justify-content-evenly'>
            <div className='card w-25'>
              <a href='/artists' className='btn btn-primary'>Artist List</a>
            </div>
            <div className='card w-25'>
            <a href='/songs' className='btn btn-primary'>Song List</a>
            </div>
            <div className='card w-25'>
            <a href='/albums' className='btn btn-primary'>Album List</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
}



export default connect(null, {})(Main)