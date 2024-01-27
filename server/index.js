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


app.post("/api/insert",(req,res) =>{
    
    const movieName= req.body.movieName;
    const movieReview= req.body.movieReview;

    const sqlquery="INSERT INTO movie_reviews (movieName,movieReview) VALUES (?,?);" 

    db.query(sqlquery,[movieName,movieReview],(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Common")
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

app.listen(3001, ()=>{
    console.log("Running on port 3001");
});