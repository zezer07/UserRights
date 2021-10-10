 
 import {useState,useEffect} from 'react'
 import firebase from 'firebase'

function EditMemberPageComp(props) 
{

  const [Name,setName] = useState("")
  const [Email,setEmail] = useState("")
  const [City,setCity] = useState("")

  useEffect(()=>
  {
    debugger;
    firebase.firestore().collection("Members").doc(props.match.params.memberId).get()
    .then(per=>{

      setName(per.data().Name)
      setEmail(per.data().Email)
      setCity(per.data().City)

  })},
  
  []);
  
  const updateMember =()=>
  {
    let obj = {Name : Name , Email : Email, City : City}
    firebase.firestore().collection("Members").doc(props.match.params.memberId).
    set(obj).then(data=>{

      alert('Updated')
      props.history.push("/Subscriptions/" +props.match.params.memberId +"/" + props.match.params.userId)
    })
  }

  
  return (

    <div className= "DesignSubscriptions">

    <h2>Edit Member  : {Name}</h2>
      
     Name : <input type="text" defaultValue={Name} onChange={e=>{setName(e.target.value)}}/> <br/> <br/>
     Email : <input type="text" defaultValue={Email} onChange={e=>{setEmail(e.target.value)}}/> <br/> <br/>
     City : <input type="text" defaultValue={City} onChange={e=>{setCity(e.target.value)}}/> <br/> <br/>

      <input type = "button" value= "update" onClick={updateMember}/> <br/> <br/>

      <input type= "button" value = "cancel" onClick={e=>{props.history.push("/Subscriptions/" +props.match.params.memberId +"/" + props.match.params.userId)}}/> <br/> <br/>

      
      
    </div>

  );


  }

  export default EditMemberPageComp;

