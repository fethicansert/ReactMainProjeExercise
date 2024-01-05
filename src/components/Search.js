import React from 'react'
import { BsSearch } from "react-icons/bs";

function Search({ handleSearch, searchInput}) {
  return (
    <form className='search' onSubmit={ (e) => e.preventDefault()}>
      <input type='text' onChange={ handleSearch } value={ searchInput } required placeholder='Search Item' ></input>
      {/* <button role='button' aria-label='Search Button'><BsSearch/></button> */}
    </form>
  )
}

export default Search
