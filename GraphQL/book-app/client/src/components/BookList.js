import React from 'react'
import { gql, useQuery } from '@apollo/client'


export const getBooksQuery = gql`
query GetBooks{
  books{
    name
    id
  }
}
`

const BookList = () => {  
  const { loading, error, data } = useQuery(getBooksQuery)

  if(loading){
    return( <p>Loading....</p> )
  }else if(error){
    return( <p>Server Error</p> )
  }else{
    return (
      
      <div className='container'>
          <ul id='book-list'>
            {data.books.map((item, index)=> (
              <li key={index}>
                <a href={`/book/${item.id}`}>
                <p>Name{item.name}</p>
                <p>Id: {item.id}</p></a>
              </li>))}
          </ul>
      </div>
    )
  }
}

export default BookList