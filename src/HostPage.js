import {Route,Switch,Link} from 'react-router-dom'
import {MoviesContextProvider} from './context'
import LoginPageComp from './LoginPage'
import MainPageComp from './MainPage'
import CreateAccountComp from './CreateAccount'
import MoviesPageComp from './MoviesPage'
import SubscriptionsPageComp from './SubscriptionsPage'
import UsersManagementComp from './UsersManagement'
import EditUserPageComp from './EditUserPage'
import AddUserPageComp from './AddUserPage'
import AddMoviePageComp from './AddMoviePage'
import EditMoviePageComp from './EditMoviePage'
import EditMemberPageComp from './EditMemberPage'
import AddMemberPageComp from './AddMemberPage'

function HostPageComp() {
  return (

    <MoviesContextProvider>
    <div>
   
   <h1>Movies- Subscriptions Web Site</h1>
      
     
     <Switch>

       <Route exact path = "/" component = {LoginPageComp}/>

       <Route path = "/MainPage/:userId" component = {MainPageComp}/>

       <Route path = "/CreateAccount" component = {CreateAccountComp}/>
       
       <Route path ="/Movies/:userId/:mov" component = {MoviesPageComp}/>

       <Route path ="/Movies/:userId" component = {MoviesPageComp}/>

       <Route path ="/Subscriptions/:userId" component ={SubscriptionsPageComp}/>

       <Route path ="/UsersManagement/:userId" component={UsersManagementComp}/>

       <Route path = "/EditUser/:userId" component={EditUserPageComp}/>

       <Route path ="/AddUser/:userId" component ={AddUserPageComp}/>

       <Route path ="/AddMovie/:userId" component ={AddMoviePageComp}/>

       <Route path = "/EditMovie/:movieId/:userId" component = {EditMoviePageComp}/>

       <Route path = "/EditMember/:memberId/:userId" component ={EditMemberPageComp}/>

       <Route path = "/AddMember/:userId" component = {AddMemberPageComp}/>

     </Switch>

     
     
    </div>

    </MoviesContextProvider>
  );
}

export default HostPageComp


