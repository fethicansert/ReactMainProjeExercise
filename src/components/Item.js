import { FaBeer, FaPhoenixSquadron} from 'react-icons/fa'
import { FaRegTrashAlt } from "react-icons/fa";

function Item({item, deleteItem, handleChecked}){
    console.log("Item Created");
    return (
        <li tabIndex={0}>
            <input type='checkbox' checked={ item.checked }  onChange={()=> handleChecked(item.id)}/>
            <label style={ (item.checked) ? {textDecoration: 'line-through'} : null }  onDoubleClick={() => deleteItem(item.id)}> { item.item } </label>
            <FaRegTrashAlt role='button' onClick={()=> deleteItem(item.id)} aria-label={`Delete ${item.item}`}/> 
        </li>
    );
}

export default Item;

//arila-label => Cogu elementin accesible name i vardir button icindeki text <button>TEXT</button>
//img elementinin alt atributesi inputlar icin accesinle nabe labelaridir 
//<label for='input'>InputLabel</> <input type='textbox name='input' id='input'/>