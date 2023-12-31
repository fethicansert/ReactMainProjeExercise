import React, { useEffect, useState } from 'react'
import data from '../data/Items'
import User_Inputs from './User_Inputs';
import ItemList from './ItemList';


export default function Main({items, input, handleChecked, addItem ,deleteItem, deleteSelected, handleInput}) {
    

    return (
        <main>
            <User_Inputs 
                addItem={ addItem } 
                handleInput={ handleInput } 
                input={ input } 
                deleleteSelected={ deleteSelected }
            />

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



