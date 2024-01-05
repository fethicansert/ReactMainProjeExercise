import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Content from './components/Content';
import User_Inputs from './components/User_Inputs'
import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Search from './components/Search';


function App() {
  const API_URL = 'http://localhost:3500/items';

  //React Hooks
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const inputFocusRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error(`Did not receieved expected data`)
        const data = await response.json();
        setItems(data);
        setFetchError(null);
      } catch(err) {
        console.log(err.message);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    //Neden is Loading finally asamasinda setlendi ?
    //Cunku fetchden olumlu veya olumsuz bir sonuc alsak bile iki secenekte de islemi bitirmis oluyor.
    //try ve cath de ayri ayri setIsLoading kullanmamiza gerek yok. 

    setTimeout(()=>{
      (async () => await fetchData())();
    },2000)
    
  },[]);
   
  const newItems = { items: [{id:1,item:'item1'},{id:2,item:'item2'}]}
  // fetch(`http://localhost:3500/items`,{method:'POST'});
   
  //Components Functions
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
    inputFocusRef.current.focus();
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
          inputFocusRef={ inputFocusRef }
        />
        <Search handleSearch={ handleSearch } searchInput = { searchInput  }/>
        <main>
          {!fetchError ? (
              <Content 
              items={ items.filter( item => item.item.toLowerCase().includes(searchInput.toLowerCase()) ) } 
              handleChecked={ handleChecked } 
              deleteItem={ deleteItem }  
            />
          ) : (
            <p>{fetchError}</p>
          )}
        </main> 
      </div>
      <Footer itemLength={ items.length }/>
    </div>
  );
}

export default App;

//const [state, setState] = useState({name:"Fethi"});
// useEffect(() => {
//    setState({name: "Fethi"});
// },[state])

//useEffect icinde setState kullanirken obj degisiminde dikkatli olmaliyiz
//setState icinde yeni bir obje yaratmak onceki state ile degerleri ayni bile olsa 
//prevState = { name: "Fethi"}
//newState = { name: "Fethi" }
//Farkli sayilacaktir cunku objler reference ile karsilastirma yapilir
//Yeni bor obj yarattimizda onu tutan deger onun reference valuesu olur bu nedenle
//prevState === newState false ve bu useEffectin loop yapmasinda neden olur cunku array dependeci statein degistigini dusunur