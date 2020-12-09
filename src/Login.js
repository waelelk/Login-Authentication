import React from 'react';

const Login = (props) => {

    const { email, setEmail, password, setPassword, handleLogin, handleSignup, hasAcount,
        setHasAcount, emailError, passwordError } = props;

    return(
        
        <section className="login">
            <div className="loginContainer">
                <label>Username or Email</label>
                <input type="text" autoFocus required 
                value={email} onChange={e => setEmail(e.target.value)}/>
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="password" required
                value={password} onChange={e => setPassword(e.target.value)}/>
                <p className="errorMsg">{passwordError}</p>
            </div>        
            <div className="btnContainer">
                {hasAcount ? (
                    <>
                        <button onClick={handleLogin}> Sign in </button>
                        <p> Don't have an acount ? <span onClick={() => setHasAcount(!hasAcount)}> Sign up </span> </p>
                    </>
                ) : (
                    <>
                        <button onClick={handleSignup}> Sign up </button>
                        <p> Have an acount ? <span onClick={() => setHasAcount(!hasAcount)}> Sign in </span></p>
                    </> 
                )}
            </div>
           <div/> 
        </section>
    )
}

export default Login;