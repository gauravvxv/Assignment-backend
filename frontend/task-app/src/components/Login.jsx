import React, { useContext, useState } from 'react'
import styles from "../styles/login.module.css"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContextProvider'
import axios from 'axios'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const { login, authState } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = {
            email: email,
            password: password
        }

        try {
            setLoading(true);
            const api = await axios.post("https://lovely-pike-suspenders.cyclic.app/login", data);
            localStorage.setItem("token", api.data.token)
            login(api.data.token)
           console.log(api)
            const userId = api.data.userId;
            console.log(userId)
            navigate(`/profile/${userId}`);


        } catch (error) {
            setLoading(false);
            console.error("Login failed:", error.response.data);
            setError(error.response.data)
        }
    }


    if (authState.isAuth) {
        console.log("user is Authenticated");
    }


    return (
        <div className={styles.container}>
            <div className={styles.minicontainer}>
                <div className='inputs'>
                    <h1>Login</h1>

                    <form onSubmit={handleSubmit}>

                        <input type="email" name="email" id="email" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} className={styles.inp} />
                        <br />
                        <br />

                        <input type="password" name="password" id="password" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inp} />
                        <br />
                        <br />
                        <p className={styles.error}>
                            {error}
                        </p>
                        <button type='submit' className={styles.loginBtn} disabled={loading} >{loading ? 'Loading...' : 'Log in'}</button>
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
