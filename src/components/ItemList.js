import React from 'react'
import Item from './Item';

function ItemList({items, deleteItem, handleChecked}) {
  // console.log("List Created");
  return (
    <ul>
    {items.map( item => {
        return (
            <Item key={item.id} item={ item } deleteItem={ () => deleteItem(item.id) } handleChecked={ handleChecked }/>
        );
  })}
  </ul> 
  )
}

export default ItemList
