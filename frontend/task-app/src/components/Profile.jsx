import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from "../styles/profile.module.css"
const Profile = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState({})
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();
  const showData = async () => {
    try {
      const api = await axios.get(`https://ant-sunglasses.cyclic.app/profile?id=${userId}`)
      setProfileData(api.data);
      console.log(api.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    showData();
  }, [userId])

  const handleTask = () => {
    navigate("/task")
  }


  const handleEdit = (task) => {
    setEditData({ ...task })
  }

  const handleSaveChanges = async (ID) => {
    try {
      await axios.patch(`  https://ant-sunglasses.cyclic.app/profile/${ID}`, {
        firstName: editData.firstName,
        lastName: editData.lastName,
        email: editData.email,
        phone: editData.phone,
        password: editData.password
      })
      setEditData(null);
      showData();
      console.log("profile has been edited")
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setEditData(null);
  }

  return (
    <div className={styles.container}>
      <h2>User Profile</h2>
      <div className={styles.btnDiv}>
        <button className={styles.btn} onClick={handleTask}>Tasks</button>
        <div className={styles.buttonSpacer}></div>
        {editData ? (
          <div className={styles.inputTags}>
            <div>
              <input type="text" name="fistName" id="firstName" placeholder='Edit Your First Name' className={styles.changeInp} value={editData.firstName} onChange={(e) => setEditData({ ...editData, firstName: e.target.value })} />
              <br />
              <br />
              <input type="text" name="lastName" id="lastName" placeholder='Edit Your Last Name' className={styles.changeInp} value={editData.lastName} onChange={(e) => setEditData({ ...editData, lastName: e.target.value })} />

              <br />
              <br />
              <input type="email" name="email" id="email" placeholder='Edit Your Email' className={styles.changeInp} value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
              <br />
              <br />
              <input type="number" name="number" id="number" placeholder='Edit Your Phone Number' className={styles.changeInp} value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
              <br />
              <br />
              <input type="password" name="password" id="password" placeholder='Change Your Password' className={styles.changeInp} value={editData.password} onChange={(e) => setEditData({ ...editData, password: e.target.value })} />
              <br />
              <br />

              <div className={styles.changingBtn}>
              <button className={styles.btn} onClick={() => handleSaveChanges(userId)}>
                Save Changes
              </button>
              <div className={styles.buttonSpacer}></div>
              <button className={styles.btn} onClick={handleCancel}>
                Cancel
              </button>
            </div>
            </div>
          </div>
        ) : (
          <button className={styles.btn} onClick={handleEdit}>
            Edit Profile
          </button>
        )}
      </div>
      <div className={styles.userData}>
        <div>
          <h2>First Name: {profileData.firstName}</h2>
          <h2>Last Name: {profileData.lastName}</h2>
          <h2>Email:  {profileData.email}</h2>
          <h2>Phone Number: {profileData.phone}</h2>
        </div>
      </div>
    </div>

  )
}

export default Profile
