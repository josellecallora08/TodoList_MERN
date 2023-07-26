import React, { useEffect, useState } from 'react'
import './content.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import {baseURL} from '../utils/constants';
import EditModal from './_editModal';
import Navbar from '../components/Navbar'
import {useTaskContext} from '../hooks/useTaskContext'
import { useLoadingContext } from '../context/LoadingContext';
import { useUserContext } from '../hooks/useUserContext';

const _content = () => {
    document.title = "To do list";

    // UseState
    const [openEditModal, setopenEditModal] = useState(false);
    const [Name,setName] = useState('');
    const [editName, seteditName] = useState('');
    const [Description, setDescription] = useState('')
    const [editDescription, seteditDescription] = useState('')
    const [handlerID, setHandlerID] = useState('');
    const [error, setError] = useState(null)
    const [updateUI, setupdateUI] = useState(false)

    // hooks
    const {tasks, dispatch} = useTaskContext()
    const { isLoading } = useLoadingContext()
    const { users } = useUserContext()


    const closeModal = () => {
        setopenEditModal(false)
    };

    const openModal = (data) => {
        setopenEditModal(true)
        setHandlerID(data);
    };

    useEffect(() => {
        const fetchData = async () => {
        
            const response = await axios.get(`${baseURL}`,{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${users.token}`
                },
            })
            const data = await response.data;
                dispatch({
                    type: "SET_TASK",
                    payload: data
                })
                console.log(data);
        }

        if(users){
            fetchData();
        }
    }, [dispatch,updateUI,users]);

   
    const addtask = async () => {
        if(!users){
            setError('You must be logged in')
            return
        }
        try {
            const response = await axios.post(`${baseURL}`, {
                Name:Name,
                Description:Description,
            },
            { 
                headers: {
                'Authorization' : `Bearer ${users.token}`
                }
            });
                const res = response.data;

                setError(null);
                setName('');
                setDescription('')
                
                dispatch({
                    type: "CREATE_TASK",
                    payload: res
                })
        }
        catch (error) {
            if(error.response){
                const { data } = error.response;
                alert(data.error);
            } 
            else{
                console.error('An error occurred:', error.message);
            }
        }
    } 

    const editTask = async (data) => {
        const id = data._id;

        const editedFields = {};

        // Check if the name field has been edited
        if (editName !== data.Name && editName.length > 0) {
          editedFields.Name = editName;
        }
        // Check if the description field has been edited
        if (editDescription !== data.Description && editDescription.length > 0) {
          editedFields.Description = editDescription;
        }
        try{
            const response = await axios.patch(`${baseURL}/${id}`, editedFields,{
                headers:{
                    'Authorization' : `Bearer ${users.token}`
                }
            })
            const res = response.data;
            setError(null)
            seteditDescription('');
            seteditName('');
            setopenEditModal(false)
            dispatch({
                type:"EDIT_TASK",
                payload: res
            })
            setupdateUI((prevState) => !prevState)
        }
        catch (error){
            if(error.response){
                const { data } = error.response;
                alert(data.error)
            }else{
                console.error('An error occurred:', error.message);
            }
        }
   };


    const completeTask = async  (id) => {
        if(!users){
            return
        }
        await axios.patch(`${baseURL}/${id}`,{
            Status: true,
        },{
            headers: {
                'Authorization' : `Bearer ${users.token}`
            }
        }).then((res) => {
            dispatch({
                type:"EDIT_TASK",
                payload: res.data
            })
            setupdateUI((prevState) => !prevState)
        }).catch((error)=>{
            setError(error.message)
        })
    };

    const deleteTask = async (id) => {
        if(!users){
            return
        }
        await axios.delete(`${baseURL}/${id}`,{
            headers:{
                'Authorization' : `Bearer ${users.token}`
            }
        })
        .then((res) => {
            dispatch({
                type:"DELETE_TASK",
                payload: res.data
            })
            setError(null)
        }).catch((error)=>{
            setError(error.message)
        })
    };
   
     

  return (
    <div>
        <Navbar />
       {isLoading ? <div className='loading'></div> :  <div className='content'>
            {error && <div className='App'> {error} </div> }
            <div className="container">
                <div className="input-field">
                    <input type="text"
                    placeholder='Enter Task'
                    value={Name}
                    onChange={ (e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <input type="text"
                    placeholder='Enter Description'
                    value={Description}
                    onChange={ (e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <button onClick={addtask}>
                        <i className="fa-solid fa-plus"></i>
                        <span>Add task</span>
                    </button>
                </div>
            </div>
            <div className="table-wrapper overflow">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.map((val,key) => (
                        <tr key={key}>
                            <td>{val.Name}</td>
                            <td>{val.Description}</td>
                            <td>{val.Status === false ? "Incomplete" : "Complete"}</td>
                            <td>
                                {val.Status === false ? 
                                <button onClick={() => openModal(val)}>
                                    <i className="fa-solid fa-edit"></i>
                                    <span>Edit</span>
                                </button>  : ""}
                                <button onClick={() => deleteTask(val._id)}>
                                    <i className="fa-solid fa-remove"></i>
                                    <span>Delete</span>
                                </button>
                                {val.Status === false ? <button onClick={() => completeTask(val._id)}>
                                    <i className="fa-solid fa-check"></i>
                                    <span>Complete</span>
                                </button> : ""}
                            </td>
                        </tr> ))}
                    </tbody>
                </table>
            </div>
           {openEditModal ?  <EditModal
            handlerID={handlerID}
            closeModal={closeModal}
            editTask={editTask}
            seteditName={seteditName}
            seteditDescription={seteditDescription}
            editName={editName}
            editDescription={editDescription}
            error={error}
            /> : ''}
        </div> }
    </div>
  )
}

export default _content;