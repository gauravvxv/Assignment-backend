import React from 'react'
import styles from "../styles/signup.module.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"


const Signup = () => {
  const[firstName,setFirstName] = useState('');
  const[lastName,setLastName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[phone,setPhone] = useState('');
  const [error,setError] = useState('');

  const handleSubmit = async (e) => {
e.preventDefault();

const data = {
  firstName: firstName,
  lastName: lastName,
  email: email,
  password: password,
  phone: phone
}

if(!firstName ||!lastName || !email || !password || !phone){
  setError("Please fill all the fields")
  return
}

try {
  const api = await axios.post('https://lovely-pike-suspenders.cyclic.app/signup',data)
  alert("Signup Successful")
  console.log(api);

  setFirstName('');
  setLastName('');
  setEmail('');
  setPassword('');
  setPhone('');

  
  window.location.href="/login"
} catch (error) {
  console.log(error);

}

  }

  return (
    <div className={styles.container}>
      <div className={styles.minicontainer}>
<div className={styles.image}>
<img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg" alt="img" />
</div>
<div className={styles.inputs}>
<h1>Signup</h1>

<form onSubmit={handleSubmit}>
<input type="text" name="fistName" id="firstName" placeholder='Enter Your First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)} className={styles.inp} />
<br />
<br />
<input type="text" name="lastName" id="lastName" placeholder='Enter Your Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)} className={styles.inp} />
<br />
<br />
<input type="email" name="email" id="email" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}  className={styles.inp} />
<br />
<br />
<input type="number" name="number" id="number" placeholder='Enter Your Number' value={phone} onChange={(e)=>setPhone(e.target.value)}  className={styles.inp} />
<br />
<br />
<input type="password" name="password" id="password" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}  className={styles.inp} />
<br />
<br />
<p className={styles.error}>
  {error}
</p>
<button type='submit' className={styles.signupBtn}>Sign up</button>
</form>
<br />
<div>
<Link to="/login">I am already member</Link>
</div>

</div>
      </div>
    </div>
  )
}

export default Signup
