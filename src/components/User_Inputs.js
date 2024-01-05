import React from 'react'
import { SiAddthis } from "react-icons/si";
function User_Inputs({ input, handleInput, addItem, deleleteSelected, inputFocusRef }) {

  return (
    <form onSubmit={ addItem }>
      <input id='item-name' type='text' value={ input } onChange={ handleInput } ref={ inputFocusRef } placeholder='Add Item' autoFocus required />
      <button className='submit-btn' type='submit'  aria-label='Add Item' ><SiAddthis/></button>
      <button type='button' className='delete-selected-btn' onClick={ deleleteSelected }>Delete Selected</button>
    </form>
  )
}

export default User_Inputs

//label for => htmlFor => htmlFor = 'userName' => id = 'userName'
//auto focues work when first page loaded after re-render auto-focus may not expexted
//after re-render focus can change 
//we can use ref attributes and useRef to handle this problem
