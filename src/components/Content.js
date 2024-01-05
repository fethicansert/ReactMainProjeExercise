import React, { useEffect, useState } from 'react'
import ItemList from './ItemList';


export default function Content({items, handleChecked, deleteItem,}) {
    return (
        <>       
            {items.length ? (
            <ItemList 
                items={items} 
                deleteItem={ deleteItem } 
                handleChecked={ handleChecked }
            />
            ) : ( 
                 <p className='empty-text'>List is Empty</p> 
            )}
        </>
    );
}



