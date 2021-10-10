import {useState} from 'react'
import firebase from 'firebase'

function AddMemberPageComp (props)
{
  const [Name,setName] = useState("")
  const [Email,setEmail] = useState("")
  const [City,setCity] = useState("")

  const addMember = ()=>
  {
      let obj ={Name : Name, Email : Email, City : City}
      firebase.firestore().collection("Members").add(obj)
      .then(resp=>{
          alert('Person created')
          props.history.push("/Subscriptions/" + props.match.params.userId)
      })

  }

 return (

    <div className= "DesignSubscriptions">
          <h2>Add new Member</h2>

         Name : <input type="text" onChange={e=>{setName(e.target.value)}}/> <br/> <br/>
         Email : <input type="text"  onChange={e=>{setEmail(e.target.value)}}/> <br/> <br/>
         City : <input type="text" onChange={e=>{setCity(e.target.value)}}/> <br/> <br/>
          
          <input type ="button" value="save" onClick={addMember}/> <br/> <br/>
          <input type ="button" value="cancel"onClick={e=>{props.history.push("/Subscriptions/" + props.match.params.userId)}}/> <br/> <br/>

    </div>

);

}

export default AddMemberPageComp