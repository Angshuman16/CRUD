
import React,{useState,useEffect} from 'react';
import Axios from 'axios';



import './App.css';

function App() {

  const[movieName,setmovies] = useState('');
  const [review,setreview]= useState('');
  const[movieList,setmovieList] = useState([]);
  const [newReview,setnewReview] = useState("");




  useEffect(() =>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
     
      setmovieList(response.data);
    })
  })


  const submitReview = () =>{
    Axios.post("http://localhost:3001/api/insert", {
      movieName:movieName,
      movieReview:review,
    });

    setmovieList([...movieList,
      {movieName:movieName,movieReview:review},
      
    ]);

  };


  const deleteReview = (movie) =>{
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  }


  const updateReview = (movie) =>{
    Axios.put("http://localhost:3001/api/update",{
      movieName:movie,
      movieReview:newReview,
    });
    setnewReview("");
  }

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

    {movieList.map((val)=>{
      return (
        <div className="card">
          <h1>{val.movieName}</h1>
          <p>{val.movieReview}</p>

          <button id="btndelete" onClick={() =>{deleteReview(val.movieName)}}>Delete</button>
          <input type="text" id="updateinput" onChange={(e) =>{
               setnewReview(e.target.value);
          }}></input>
          <button id="btndelete" onClick={() => {updateReview(val.movieName)}}>Update</button>
         
        </div>
        
      );
      
      
    })}

    
    </div>
  );
}

export default App;
