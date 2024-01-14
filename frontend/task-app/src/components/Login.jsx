import React, { useState } from 'react'
import styles from "../styles/login.module.css"
import { Link } from 'react-router-dom'
import Signup from './Signup'
import axios from 'axios'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading,setLoading] = useState('');

    const handleClick = () => {
        if (!email || !password) {
            setError("Fill all the fields")
            return
        }
        else{
            setLoading(true);

            setTimeout(()=>{
                setLoading(false);
                window.location.href="/task";
            },1000)
        }
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }
        try {
            setLoading(true);
        const api = await axios.post("http://localhost:8000/login",data);
        setLoading(false);
        console.log(api.data.token)
        localStorage.setItem("token",api.data.token)
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

 

    return (
        <div className={styles.container}>
            <div className={styles.minicontainer}>
                <div className='inputs'>
                    <h1>Login</h1>

                    <form onSubmit={handleSubmit}>

                        <input type="email" name="email" id="email" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} className={styles.inp} />
                        <br />
                        <br />

                        <input type="password" name="password" id="password" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)} className={styles.inp} />
                        <br />
                        <br />
                        <p className={styles.error}> 
                            {error}
                        </p>
                        <button type='submit' onClick={handleClick} className={styles.loginBtn}>{loading ? 'Loading...' : 'Log in'}</button>
                    </form>
                    <br />
                    <div>
                        <Link to="/signup">Create an account</Link>
                    </div>
                </div>
                <div className={styles.image}>
                    <img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg" alt="img" />
                </div>
            </div>
        </div>
    )
}

export default Login
