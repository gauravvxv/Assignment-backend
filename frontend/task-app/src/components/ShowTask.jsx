import React, { useEffect, useState } from 'react'
import styles from '../styles/showData.module.css'
import axios from 'axios';
const ShowTask = () => {
    const [showData, setShowData] = useState([]);
    const [editData, setEditData] = useState(null);


    const taskDataShow = async () => {
        try {
            const api = await fetch(`https://ant-sunglasses.cyclic.app/task`);
            const data = await api.json();
            console.log(data);
            setShowData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        taskDataShow();
    }, [showData])


    // edit function

    const handleEdit = (task) => {
        setEditData({ ...task })
    }

    const handleSaveChanges = async (ID) => {
        try {
            await axios.patch(`https://ant-sunglasses.cyclic.app/task/${ID}`, {
                title: editData.title,
                description: editData.description
            });
            setEditData(null);
            taskDataShow();
            console.log(`edit task id ${ID}`)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setEditData(null);
    }


    // delete function

    const handleDelete = async (ID) => {
        try {
            await axios.delete(`https://ant-sunglasses.cyclic.app/task/${ID}`);
            console.log(`the task has been deleted of this id :${ID}`)

            taskDataShow();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.taskContainer}>
            {showData.map((e, ind) => (
                <div key={ind} className={styles.taskBox}>

                    {editData && editData._id === e._id ? (
                        <>
                            <input type="text" name="title" id="title" className={styles.changeInp} value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                            <br />
                            <br />
                            <input type="text" name="description" id="description" className={styles.changeInp} value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />

                            <br />
                            <br />


                            <div className={styles.changingBtn}>
                                <button onClick={() => handleSaveChanges(editData._id)} className={styles.changebtnn}>Save</button>
                                <div className={styles.buttonSpacer}></div>
                                <button onClick={handleCancel} className={styles.changebtnn}>Cancel</button>
                            </div>
                        </>
                    ) : <>
                        <h3>Title: {e.title}</h3>
                        <p>Description: {e.description}</p>
                        <div className={styles.twoBtn}>
                            <button className={styles.btn} onClick={() => handleEdit(e)}>Edit</button>
                            <div className={styles.buttonSpacer}></div>
                            <button className={styles.btn} onClick={() => handleDelete(e._id)}>delete</button>
                        </div>
                    </>}


                </div>
            ))}
        </div>
    )
}

export default ShowTask
