'use strict';

const express=require('express');
const cors = require("cors");

const  server=express();
const data= require('./Movie-Data/data.json');
server.use(cors());
require('dotenv').config();
const axios = require('axios');
const apiKey=process.env.api_key;

 server.listen(3001,startingLog);

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
 

 server.get('/', handleHome);
server.get("/trending",trending);
server.get("/search",search);
server.get("/discover",discover);
server.get("/watch",watch)
server.get("/favorite",favoritePage);
server.get("/500", handlerError500);



function handleHome(req , res){
    console.log("welcome home");
   
    res.send(newMovie);
}

 server.get('/favorite', handleFavorite);

function handleFavorite(req , res){
    console.log("Welcome to Favorite Page"); 
} 
function favoritePage(req,res){
    res.send("Welcome to Favorite Page");
}

function trending(req,res){
    try {
        const url=`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`;
    axios.get(url)
    .then(result=>{let resultAxois=result.data.results.map(item=>{
        let singleMovie = new Format(item.id,item.title,item.release_date,item.poster_path,item.overview);
        return singleMovie;
    })

        res.send(resultAxois);
    }).catch((error)=>{
        console.log('Try again somthing happend',error)
        res.status(500).send(error);
    })
}
catch(error){
    errorHandler(error,req,res)
}
}
 function search(req,res){
    const url=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=The&page=2`;
    try {
     axios.get(url)
     .then(result=>{let resultAxois=result.data.results.map(item=>{
        let singleMovie = new Format(item.id,item.title,item.release_date,item.poster_path,item.overview);
        return singleMovie;
    })
    res.send(resultAxois);
}    ).catch((error)=>{
    console.log('Try again somthing happend',error)
    res.status(500).send(error);
})

} catch (error) {
    errorHandler(error,req,res)
} 
} 
function discover(req,res){
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false`;
    try{
        axios.get(url)
        .then(result=>{let resultAxois=result.data.results.map(item=>{
            let singleMovie = new Format(item.id,item.title,item.release_date,item.poster_path,item.overview);
            return singleMovie;
            })

            res.send(resultAxois);
        })
        .catch((error)=>{
            console.log('Try again somthing happend',error)
            res.status(500).send(error);
        })
    }
    catch(error){
        errorHandler(error,req,res)
    }
}

function watch(req,res){
    const url = `https://api.themoviedb.org/3/watch/providers/tv?api_key=${apiKey}&language=en-US`;
    try{
        axios.get(url)
        .then(result=>{let resultAxois=result.data.results.map(item=>{
            return item.display_priorities;
            })

            res.send(resultAxois);
        })
        .catch((error)=>{
            console.log('Try again somthing happend',error)
            res.status(500).send(error);
        })
    }
    catch(error){
        errorHandler(error,req,res)
    }
}

function handlerError500(req,res){
    let obj = { status: 500, responseText: "Sorry, something went wrong" };
    res.status(500).send(obj);
}

function errorHandler(error,req,res){
    const err = {
        status: 500,
        message: error
    }
    res.status(500).send(err);
}
function handlerDefaultErro(req,res){
    res.status(404).send("page not found");
}

function Format(id,title, release_date,poster_path, overview) {
    this.id=id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path=poster_path;
  this.overview = overview;
  movies.push(this);
}

 server.get('*', handleNotFound);

function handleNotFound(req , res){
    
    res.send({
        status: 404,
        responseText: "page not found error",
        gide:" for home type /       for favorite type /favorite  ",
              });
} 



 