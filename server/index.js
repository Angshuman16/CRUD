const bodyParser = require('body-parser');
const express= require('express');
const cors= require("cors");

const app = express();
const mysql = require('mysql2');


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Angshu@2003",
    database: "cruddatabase",
});



db.connect((err => {
    if (err) throw err;
    console.log('MySQL Connected');
}));



app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));


app.get("/api/get",(req,res)=>{
    const sqlSelect= "SELECT * FROM movie_reviews;"

    db.query(sqlSelect,(err,result)=>{
        if(err) throw err;
       
        res.send(result);
    })
})


app.post("/api/insert",(req,res) =>{     //API for posting the content to the backend from the Frontend
    
    const movieName= req.body.movieName;
    const movieReview= req.body.movieReview;

    const sqlquery="INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?);" 

    db.query(sqlquery,[movieName,movieReview],(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Hemlo world");
    })
})


// app.get('/',(req,res)=>{

//     const sqlInsert= "INSERT INTO movie_reviews (movieName,movieReview) VALUES ('Inception','good movie');  "
//     db.query(sqlInsert,(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         res.send("Hello world");
        
//     })
   
// });


app.delete("/api/delete/:movieName",(req,res)=>{
   const name= req.params.movieName;
   const sqldelete="DELETE FROM movie_reviews WHERE movieName = ?;" 
    
   db.query(sqldelete,name,(err,result)=>{
    if(err) throw err;
    console.log(result);
    
})
   
})


app.put("/api/update/",(req,res)=>{
    const name= req.body.movieName;
    const review= req.body.movieReview;
    const sqlupdate="UPDATE movie_reviews SET movieReview=? WHERE movieName=?;" 
     
    db.query(sqlupdate,[review,name],(err,result)=>{
     if(err) throw err;
     console.log(result);
     
 })
    
 })





app.listen(3001, ()=>{
    console.log("Running on port 3001");


});