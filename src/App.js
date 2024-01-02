import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Content from './components/Content';
import User_Inputs from './components/User_Inputs'
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Search from './components/Search';


function App() {
  
  //Learn Split Includes Filter [...arr or ...obj]
  const arr = ['cat','dog','bat'];
  // const arrX = [1,2,3,4,5];
  // console.log(arrX.includes());
  const intArr = [1,2,3,4];
  // console.log(intArr);
  // console.log(...intArr);

  const y = 'str';
  // console.log(y);
  // console.log(...y);
  
  // const filterArr = arr.filter(item => item.includes(''));
  // console.log(filterArr);
  //includes return true or false according to giving statement
  
  
  //My filter and include func
  function myIncludes(arr,input){
    let isMatchArr = [];
    for(let i = 0; i<arr.length; i++){
      for(let j = 0; j<arr[i].length; j++){
        if(arr[i][j] === input){
          isMatchArr.push(arr[i]);
          break
        }
      }
    }
    return isMatchArr;
  }

  myIncludes(arr,'a');

  const [items, setItems] = useState(
    (localStorage.getItem('data') && JSON.parse(localStorage.getItem('data'))) || []
  );

  const [input, setInput] = useState('');

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    localStorage.setItem('data',JSON.stringify(items));
  },[items]);

  useEffect(() => {
   
  },[input])

    
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

  function handleSearch(event){
    const { value } = event.target;
    setSearchInput(value);
  }

  function deleteSelected(){
    setItems(prevItem => prevItem.filter(item => item.checked === false));
  }

  function addItem(e){
    e.preventDefault();

    if(!input) return; 

    const newItem = {
      id: uuidv4(),
      checked : false,
      item : input
    };

    setItems(prevItems => [...prevItems,newItem]);
    setInput('');
  }

  return (
    <div className="App">
      <Header />
      <div className='container'>
        <User_Inputs 
          addItem={ addItem } 
          handleInput={ handleInput } 
          input={ input } 
          deleleteSelected={ deleteSelected }
        />
        <Search handleSearch={ handleSearch } searchInput = { searchInput  }/>
        <Content 
          items={ items.filter( item => item.item.toLowerCase().includes( searchInput.toLowerCase())) } 
          handleChecked={ handleChecked } 
          deleteItem={ deleteItem }  
        />
      </div>
      <Footer itemLength={ items.length }/>
    </div>
  );
}

export default App;
