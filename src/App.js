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
    </div>
  );
}

export default App;
