import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Content from './components/Content';
import User_Inputs from './components/User_Inputs'
import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Search from './components/Search';
import apiRequest from './request/APIrequest';
import myApiRequest from './components/myApiRequest';

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
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    setTimeout(()=>{
      (async () => await fetchData())();
    },1000)
    
  },[]);
   

  //Components Functions//

  //Item checkbox checked cotrol from state and pathce(update) db.json data with PATCH Request
  async function handleChecked(id){
    const listItems = items.map(item => item.id === id ? {...item,checked:!item.checked} : item);
    setItems(listItems);   

    const patchItem = listItems.filter(item => item.id === id);
 
    const options = {
      method : 'PATCH',
      headers : {
        'Content-Type':'application/json'
      },
      body : JSON.stringify( { checked: patchItem[0].checked } )
    }
    const pathcUrl = `${API_URL}/${id}`;
    const result = await apiRequest(pathcUrl, options);
    if(result) setFetchError(result);
  }

  //Delete Item from state also DELETE from db.json on json-server witd DELETE Request
  async function deleteItem(id){
    setItems(items.filter(item => item.id !== id));
    const options = {
      method: 'DELETE',
    }
    const result = await apiRequest(`${API_URL}/${id}`,options);
    if(result) setFetchError(result);
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

  //Adding Item to state and db.json on json-server with POST Request
  async function addItem (e){
    e.preventDefault();
    inputFocusRef.current.focus();

    if(!input) return; 

    const newItem = {
      id : uuidv4(),
      checked : false,
      item : input
    };
    setItems(prevItems => [...prevItems,newItem]);
    setInput('');
    
    const request = new Request(API_URL,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(newItem)
    });
    myApiRequest(request);
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
          {isLoading && <p>Loading items...</p>}
          {fetchError && <p>{ fetchError }</p>}
          {!fetchError && !isLoading && <Content 
            items={ items.filter( item => item.item.toLowerCase().includes(searchInput.toLowerCase()) ) } 
            handleChecked={ handleChecked } 
            deleteItem={ deleteItem }  
          />}
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

//REQUEST METHODS
//POST I want to inform API that I'm going to add new item with this url
//PATCH I want to inform API that I'm going to update data inside the json-server with this url
//DELETE I want to inform API that I'm going to delete data with this url

//REPONSE STATUS
//200 requets success
//201 new resource (Item object in current project) created