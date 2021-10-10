import {useState,useEffect} from 'react'
import firebase from './firebaseApp'


const NewMovieComp=(props)=>
{
  
  const [moviesName,setMoviesNAME] = useState([])
  const [dateMov,setDate] = useState("")

  useEffect (()=>{
  

    // retoucher cette fonction. Vérifier que ce qui se trouve dans la liste soient seulement les films qui n'ont pas ete encore vus 
    firebase.firestore().collection("Movies").get()
    .then(subs=>{

    let subscriptions =[]
     
    subs.forEach(sub=>{

      subscriptions.push(sub.data().Name)
      subscriptions.sort()
    })
     
    setMoviesNAME(subscriptions)

    })
 
  },[])

  const choseDate=()=>
  {
    let valueName = document.getElementById("NameSelect").value

    firebase.firestore().collection("Movies").get()
    .then(subs=>{

      subs.forEach(sub=>{

        if(sub.data().Name == valueName)
        {
          let date = sub.data().Premiered
          document.getElementById("movieDate").value= date;
          setDate(date)        
        }

      })

    })
 }

  const addSub=()=>
  {
  firebase.firestore().collection("Users")
  .doc(props.userId).get().then(resp=>
  
  {
    let CreateSubs = resp.data().Permissions.includes("CreateSubscriptions")
    let UpdateSubs = resp.data().Permissions.includes("UpdateSubscriptions")

  if(CreateSubs||UpdateSubs)
  {
    
    firebase.firestore().collection("Movies").get().then(resp1=>
      {
        let moveName =""
        resp1.forEach(x=>{
         
          if(document.getElementById("NameSelect").value==x.data().Name)
          {
            moveName = x.data().Name
          }
          
        })
      
      firebase.firestore().collection("Subscriptions").get().then(resp2=>
        {

          let arraymember = []
    
          resp2.forEach(x=>
           {
             arraymember.push(x.data().MemberId)
           })
       
         if(arraymember.includes(props.memberId)) //update Subscriptions
         {
           firebase.firestore().collection("Subscriptions").get().then(resp3=>
            
            {
              let id =""
              let movies =[]
              
              resp3.forEach(x=>{
                   
                if(x.data().MemberId==props.memberId)
                {
                  id= x.id
                  for (let index = 0; index < x.data().Movies.length; index++) 
                  {
                    
                    movies.push(x.data().Movies[index])
                  }
                }

              })
          
                let obj = {movieName: moveName, date : dateMov}
                movies.push(obj)
          
                firebase.firestore().collection("Subscriptions").doc(id).
                set({MemberId : props.memberId, Movies : movies})
          
                alert("a new subscription has added")
                props.callback(false)
            })
       
           
         }
       
         else 
         {
           //add a new Subscriptions
           let obj = {MemberId: props.memberId, Movies : [{movieName : moveName, date : dateMov}]}
           let resp = firebase.firestore().collection("Subscriptions").add(obj)
           alert("Subscription has created")
           props.callback(false)
         }

        })
      
  }) 
   
}

  else 
  {
    alert("You can't have an access to this fonction")
  }

})

  }

  const deleteSub =async()=>
  {

  // delete the movie from the subscriptions list
    firebase.firestore().collection("Users")
  .doc(props.userId).get().then(async resp=>
  
  {
 
  let DeleteSub = resp.data().Permissions.includes("DeleteSubscriptions")
  let UpdateSub = resp.data().Permissions.includes("UpdateSubscriptions")

  if(DeleteSub||UpdateSub)
  {
    let movies =[]
    let subId =""
    let resp1 = await firebase.firestore().collection("Subscriptions").get() 
    resp1.forEach(x=>{
      if(x.data().MemberId==props.memberId)
      
      {
          subId = x.id
          
          for (let index = 0; index < x.data().Movies.length; index++) 
          {
            if(document.getElementById("NameSelect").value == x.data().Movies[index].movieName)
            {
              movies = x.data().Movies
              movies.splice(index, 1)
              let obj ={MemberId : props.memberId, Movies : movies }
              firebase.firestore().collection("Subscriptions")
              .doc(subId).set(obj).then(data=>{
          
                alert('Deleted')
          
              })
            }

            else 
            {alert("The member doesn't suscribe to this movie")}
            
          }
          
      }
      
    })

  }

  else 
  
  {
    alert("You can't have an access to this fonction")
  }

})
    
   
  }

  const hide=()=>
  {
    props.callback(false)
   
  }

   let items = moviesName.map((item,index)=>{
    return <option key ={index} value={item}>{item}</option> 
    })

 if (props.show==true)
 {
  return (<div className="DesignSubscription">

    <h4> Register for a new Movie</h4>
    
   <select id ="NameSelect"onChange={e=>{choseDate()}}>

   {items}

  </select>

  <br/> <br/>

  Date of viewing: <input type="text" id = "movieDate" onChange={e=>setDate(e.target.value)}/>

  <br/> <br/>

  <input type ="button" value = "Subscribe" onClick={e=>{addSub()}}/> <br/> <br/>
  <input type ="button" value = "Delete" onClick={deleteSub}/> <br/> <br/>
  <input type ="button" value = "Cancel" onClick={e=>hide()}/> <br/> <br/>

  </div>)
}

else 
{
  return <div></div>
}

}

export default NewMovieComp;