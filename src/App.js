import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


firebase.initializeApp(firebaseConfig);

function App() {
  const [user,setUser] = useState({
    isSignedIn:false,
    name:'',
    email:'',
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
          photo: ''
        }

        setUser(signOut);
      })
  }
  const handleSubmit = () => {

  }
// for getting the value
  const handleBlur = (e) => {
    console.log(e.target.name,e.target.value);
// is email valid
    if (e.target.name === 'email') {
        const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
        console.log(isEmailValid);
    }

    if (e.target.name === 'password') {
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        console.log(isPasswordValid,passwordHasNumber);
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
          {/* form */}
        <form onSubmit={handleSubmit}>
        <input onBlur={handleBlur} type="text" placeholder="Enter your email" required name="email" id=""/>
        <br/>
        <br/>
        <input onBlur={handleBlur} type="password" placeholder="Enter your password" name="password" id="" required/>
        <br/>
        <br/>
        <input type="submit" value="submit"/>
        </form>
    </div>
  );
}

export default App;
