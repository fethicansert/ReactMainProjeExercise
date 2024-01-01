import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Content from './components/Content';
import User_Inputs from './components/User_Inputs'
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const id = 1;
  const obj = { id , name:"Fethi"};
  //Can create variable(var const let) use in jsObcject it's like {id : 1}
  console.log(obj);
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

  function deleteSelected(){
    setItems(prevItem => prevItem.filter(item => item.checked === false));
  }

  //Tek satir => if(false or true) --> Do Something  --- input = ''  => falsy  ===> -- ( !falsy ) === true -- ---
  function addItem(e){
    e.preventDefault();
    if(!input) return;
    // const processedId = items.length > 0 ? items.length + 1 : 0;
    const id = uuidv4();
    const newItem = {id, checked : false, item: input}
    //Altakini tercih ederim ama islenmesi gerek deger varsa -processedId- gibi boyle de kullanilabilir
    // const newItem = {
    //   id : uuidv4(),
    //   checked : false,
    //   item : input
    // }

    //Optimatization 
    setItems(prevItems => [...prevItems,newItem]);
    setInput('')
  }

  return (
    <div className="App">
      <Header />
      <User_Inputs 
        addItem={ addItem } 
        handleInput={ handleInput } 
        input={ input } 
        deleleteSelected={ deleteSelected }
      />
      <Content 
        items={ items } 
        handleChecked={ handleChecked } 
        deleteItem={ deleteItem }  
      />
      <Footer itemLength={ items.length }/>
    </div>
  );
}

export default App;
