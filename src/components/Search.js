import React from 'react'
import { BsSearch } from "react-icons/bs";

function Search({ handleSearch, searchInput}) {
  return (
    <div className='search'>
      <input type='text' onChange={ handleSearch } value={ searchInput } required placeholder='Search Item' ></input>
      <button role='button' aria-label='Search Button'><BsSearch/></button>
    </div>
  )
}

export default Search
