'use strict';

const express=require('express');

const app=express();
const data= require('./Movie-Data/data.json');

app.listen(3001,startingLog);

function startingLog(req, res){
    console.log("Running at 3001"); 
}
let movies=[];
function formedMovi(title,poster_path,overview){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
    movies.push(this);
}
let newMovie=new formedMovi(data.title,data.poster_path,data.overview);
 

app.get('/', handleHome);

function handleHome(req , res){
    console.log("welcome home");
   
    res.send(newMovie);
}

app.get('/favorite', handleFavorite);

function handleFavorite(req , res){
    console.log("Welcome to Favorite Page"); 
} 

app.get('*', handleNotFound);

function handleNotFound(req , res){
    
    res.send({
        status: 404,
        responseText: "page not found error",
        gide:" for home type /       for favorite type /favorite  ",
              });
} 



app.get('/error500',(req,res)=>{
    let obj={"status":500,"responseText":"Sorry, something went wrong"};
    res.send(obj);
})