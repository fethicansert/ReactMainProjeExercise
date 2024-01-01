import React, { useEffect, useState } from 'react'
import data from '../data/Items'
import ItemList from './ItemList';


export default function Content({items, handleChecked, deleteItem,}) {
    

    return (
        <main>
           
            {items.length ? (

            <ItemList 
                items={items} 
                deleteItem={ deleteItem } 
                handleChecked={ handleChecked }
            />

            ) : ( 
                 <p className='empty-text'>List is Empty</p> 
            )}
        </main>
        
    );
}



