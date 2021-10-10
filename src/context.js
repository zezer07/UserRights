import {useState, createContext} from 'react'


export const MoviesContext = createContext();

export const MoviesContextProvider= props=>
{
  const [userName,setUserName] = useState("")
  

  return(

    <MoviesContext.Provider  value= {[userName,setUserName]}>

      {props.children}


    </MoviesContext.Provider>

  )
 }
