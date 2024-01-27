import logo from './logo.svg';
import React,{useState,useEffect} from 'react';
import Axios from 'axios';



import './App.css';

function App() {

  const[movies,setmovies] = useState('');
  const [review,setreview]= useState('');


  const submitReview = () =>{
    Axios.post("http://localhost:3001/api/insert", {
      movieName:movies,
      movieReview:review,
    }).then(() =>{
      alert("SUCCESSFULL INSERTION");
    });

  };

  return (
    <div className="App">



      
      <div className="form" >
           <h1>CRUD APPLICATION</h1>

        <input type='text' onChange={(e)=>{
          setmovies(e.target.value)
        }} name="movie" placeholder='Add a Movie'/>


        <input type='text' onChange={(e) =>{
          setreview(e.target.value)
        }} name='review' placeholder='Add a Review'/>

        
    </div>
    <button className='btn' onClick={submitReview}>Submit</button>
    </div>
  );
}

export default App;
