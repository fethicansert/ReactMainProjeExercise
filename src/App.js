import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import data from './data/Items'
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [items, setItems] = useState(
    localStorage.getItem('data') && JSON.parse(localStorage.getItem('data')) || []
  );

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('data',JSON.stringify(items));
  },[items]);
    
  function handleChecked(id){
    setItems(prevItem => {
       return prevItem.map(item => item.id === id ? {...item, checked:!item.checked} : item);
   });   
  }

  function deleteItem(id){
      setItems(prevItem => {
          return prevItem.filter( item => item.id !== id );
      });
  }

  function handleInput(event){
    const { value } = event.target;
    setInput(value);
  }

  function deleleteSelected(){
    setItems(prevItem => prevItem.filter(item => item.checked === false));
  }

  function addItem(e){
    e.preventDefault();
    if(input.length > 0){
        const newItem = {
            id:uuidv4(),
            checked:false,
            item:input
        }
        setItems(prevItem => [newItem,...prevItem]);
        setInput('');
    }   
  }

  return (
    <div className="App">
      <Header />
      <Main 
        items={ items } 
        setItems={ setItems } 
        input={ input } 
        setInput={ setInput } 
        handleInput = { handleInput }
        handleChecked={ handleChecked } 
        addItem={ addItem } 
        deleteItem={ deleteItem }  
        deleteSelected={ deleleteSelected }
      />
      <Footer itemLength={ items.length }/>
    </div>
  );
}

export default App;
