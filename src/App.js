import React, { useState, useEffect } from 'react';
import fire from './firebase';
import Login from './Login';
import './App.css';

const App = () => {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPaswwordError] = useState('');
  const [hasAcount, setHasAcount] = useState(false);

  const clearInput = () => {
    setEmail('');
    setPassword('');
  }

  const clearError = () => {
    setEmailError('');
    setPaswwordError('');
  }

  const handleLogin = () => {
    clearError();
    fire 
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code){
          case "auth/invalid-email":
            case "auth/user-disabled":
              case "auth/user-npt-found":
                setEmailError(err.message);
                break;
                case "auth/wrong-password":
                  setPaswwordError(err.message);
                  break;
        }
      });
  };

  const handleSignup = () => {
    clearError();
    fire 
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(err => {
      switch(err.code){
        case "auth/email-already-in-use":
          case "auth/invalid-email":
              setEmailError(err.message);
              break;
              case "auth/weak-password":
                setPaswwordError(err.message);
                break;
      }
    });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user){
        clearInput();
        setUser(user);
      }else{
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, [])

  return (
   <div className = "App">
     <Login email={email} setEmail={setEmail} 
            password={password} setPassword={setPassword}
            handleLogin={handleLogin} handleSignup={handleSignup} 
            hasAcount={hasAcount} setHasAcount={setHasAcount}
            emailError={emailError} passwordError={passwordError}
      />
   
   </div>
  );
}

export default App;
