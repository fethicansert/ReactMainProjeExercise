import React from 'react'
import { SiAddthis } from "react-icons/si";
function User_Inputs({ input, handleInput, addItem, deleleteSelected }) {

  return (
    <form onSubmit={ addItem }>
      {/* <label htmlFor='item-name'>Item Name: </label> */}
      <input id='item-name' type='text' value={ input } onChange={ handleInput } placeholder='Add Item' autoFocus required/>
      <button className='submit-btn' type='submit'  aria-label='Add Item' ><SiAddthis/></button>
      <button type='button' className='delete-selected-btn' onClick={ deleleteSelected }>Delete Selected</button>
    </form>
  )
}

export default User_Inputs

//label for => htmlFor => htmlFor = 'userName' => id = 'userName'
