import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


firebase.initializeApp(firebaseConfig);

function App() {
  const [newUser,setNewUser] = useState(false)
  const [user,setUser] = useState({
    isSignedIn:false,
    name:'',
    email:'',
    password:'',
    photo:''
  })
  const provider = new firebase.auth.GoogleAuthProvider();

  // sign in button handler
  const handleSign = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName,email,photoURL} = res.user;
      const signedIn = {
       isSignedIn:true,
       name:displayName,
       email:email,
       photo:photoURL
        
        
      }
      setUser(signedIn);
    })
  }
// sign out button handler
  const handleSignOut = () => {
      firebase.auth().signOut()
      .then(res => {
        const signOut = {
          isSignedIn:false,
          name:'',
          email:'',
          photo: '',
          error:'',
          success:false
        }

        setUser(signOut);
      })
  }
  const handleSubmit = (e) => {
 
    if(newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        
      })
      .catch(error => {
        // Handle Errors here.
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo)
        // ...
      });
    }

    if(!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
      })
      .catch(function(error) {
        // Handle Errors here.
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo)
        // ...
      });
    }
    e.preventDefault();
  }
// for getting the value
  const handleBlur = (e) => {
    let isFieldValid = true;
// is email valid
    if (e.target.name === 'email') {
         isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
       
    }
//  for getting the password value
    if (e.target.name === 'password') {
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
       isFieldValid = isPasswordValid && passwordHasNumber;
    }

    if(isFieldValid) {
     const newUserInfo = {...user};
     newUserInfo[e.target.name] = e.target.value;
     setUser(newUserInfo);
    }
  }
  return (
    <div className="App">
       {
       
       user.isSignedIn ?  <button onClick={handleSignOut}>sign Out</button>:<button onClick={handleSign}>sign in</button>
        
        }
        {
          user.isSignedIn && <div>
            <p>Welcome {user.name}</p>
            <p>Your Email is {user.email}</p>
            <img src={user.photo} alt=""/>
          </div>
        }

        <h1>Our own authentication</h1>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New user sign up</label>
          {/* form */}
        <form onSubmit={handleSubmit}>
        {newUser && <input onBlur={handleBlur} placeholder= "enter your name" type="text" name="name" id=""/>}
        <br/>
        <br/>
        <input onBlur={handleBlur} type="text" placeholder="Enter your email" required name="email" id=""/>
        <br/>
        <br/>
        <input onBlur={handleBlur} type="password" placeholder="Enter your password" name="password" id="" required/>
        <br/>
        <br/>
        <input type="submit" value="submit"/>
        </form>
        <p style={{color:"red"}}>{user.error}</p> 
        {user.success &&   <p style={{color:"green"}}>user {newUser ? "created" : "logged in" } successfully</p> }
    </div>
  );
}

export default App;
