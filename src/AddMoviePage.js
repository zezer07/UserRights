
import {useState} from 'react'
import firebase from './firebaseApp'
import React from 'react'


function AddMoviePageComp(props) {

  const [Name,setName] =  useState("")
  const [Genres,setGenres] =  useState([])
  const [Image,setImage] =  useState("")
  const [Premired,setPremired] =  useState("")


  const addGenres = (e)=>
  {
    let arrayInput = e.target.value
    let newArray = arrayInput.split(",")
    setGenres(newArray)
  }
  
  const saveNewMovie =()=>
  {

    let objMovie ={Name : Name, Genres : Genres, Image : Image, Premiered : Premired}
    firebase.firestore().collection("Movies").add(objMovie)
    .then(data=>{
      alert ("New Movie has created with success")

      props.history.push("/Movies/"+ props.match.params.userId)

    })

  }

  return (

    <div className="DesignFilm">

      <h2>Add New Movie</h2>

      Name : <input type = "text" onChange={e=>{setName(e.target.value)}}/> <br/> <br/>
      Genres : <input type = "text" onChange={addGenres}/> <br/> <br/>
      Image URL : <input type = "text" onChange={e=>{setImage(e.target.value)}}/> <br/> <br/>
      Premired : <input type = "text" onChange={e=>{setPremired(e.target.value)}}/> <br/> <br/>

      <input type ="button" value = "save" onClick={saveNewMovie}/> <br/> <br/>
      <input type = "button" value= "cancel" onClick={e=>{props.history.push("/Movies/"+ props.match.params.userId)}}/> <br/> <br/>
         
    </div>

   
  );
}

export default AddMoviePageComp;
