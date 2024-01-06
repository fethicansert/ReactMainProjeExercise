import { useState } from 'react';
import { FaBeer, FaPhoenixSquadron} from 'react-icons/fa'
import { FaRegTrashAlt } from "react-icons/fa";

function Item({item, deleteItem, handleChecked}){
    
    // console.log("Item Created");
    const [deleted, setDeleted] = useState(false);
    const deletedStyle = { opacity: !deleted ? '1' : '0', transition:'opacity 500ms ease'}

    function deleleteItemWithAnimation(id){
        setDeleted(prevState => !prevState);
        setTimeout(()=>{
            deleteItem(id);
        },0);
        //Delay was for animation waiting delete function until animation complete in css  
    }

    return (
        <li  tabIndex={0}>
            <input type='checkbox' checked={ item.checked }  onChange={()=> handleChecked(item.id)}/>
            <label style={ (item.checked) ? {textDecoration: 'line-through'} : null }  onDoubleClick={() => deleteItem(item.id)}> { item.item } </label>
            <FaRegTrashAlt role='button' onClick={()=> deleleteItemWithAnimation(item.id)} aria-label={`Delete ${item.item}`}/> 
        </li>
    );
}

export default Item;

//arila-label => Cogu elementin accesible name i vardir button icindeki text <button>TEXT</button>
//img elementinin alt atributesi inputlar icin accesinle nabe labelaridir 
//<label for='input'>InputLabel</> <input type='textbox name='input' id='input'/>