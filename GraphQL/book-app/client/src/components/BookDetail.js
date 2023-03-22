import React, { useState, useEffect, Fragment } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

export const GET_BOOK_BY_ID = gql`
  query Book($id: ID) {
    book( id: $id ) {
      name
      id
      author {
        name
        books {
          name
        }
      }
    }
  }
`;

const BookDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: { id },
  });
  
  
  if(loading) return(<div>Loading....</div>)
  if(error) return(<div>Loading....</div>)
  const book = data.book
  
  return (
    <Fragment>
    <div>
      <h2>{book.name}</h2>
      <p>{book.author.name}</p>
      <li>Other Works</li>
      <ul>
        {book.author.books.length >= 1 ? book.author.books.map((item, index) => (
        <li key={index}>{item.name}</li>)): null}
      </ul>
    </div>
    </Fragment>
  );
}

export default BookDetail