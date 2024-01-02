import React from 'react'

function Footer({itemLength}) {

  function getDate(){
      return new Date().getFullYear();
  }

  return (
    <footer>
      {/* <p>Copy Right {getDate()}</p> */}
      <p>List Length <span style={{ textDecoration:'underline' }}>{itemLength}</span></p>
    </footer>
  )
}

export default Footer
