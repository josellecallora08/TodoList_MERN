import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Navbar from '../components/Navbar';
import { baseURL, userbaseURL } from '../utils/constants';
import { useUserContext } from '../hooks/useUserContext';
import { useTaskContext } from '../hooks/useTaskContext'

const Signup = () => {
    document.title = "Sign Up";
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [UpdateUI, setUpdateUI] = useState(false);
    const [Error, setError] = useState(null)
    const {users, dispatch} = useUserContext()
    // const {dispatch} = useTaskContext()
    const handleSignup = async () => {
        try{
            const response = await axios.post(`${userbaseURL}/`,{
                Name:Name,
                Email: Email,
                Password: Password
            })
            const data = response.data;
            localStorage.setItem('users',JSON.stringify(data))
            dispatch({
                type: "LOGIN",
                payload: data
            })
            setError(null)
        }
        catch (error){
            if(error.response){
                const { data } = error.response;
                setError(data.error)
            }
        }
    }

    

  return (
    <div>
        <Navbar/>
        <div className='container'>
            <div className="wrapper">
                <div className="form-wrapper">
                    <div className="input-field">
                        <h1>Sign Up</h1>
                    </div>
                    {Error ? 
                    <div className="errortext">
                    {Error}
                    </div> : ''}
                    <div className="input-field">
                        <input type="text" 
                        id='name'
                        placeholder=' '
                        onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="name">Name</label>
                        <span><i className="fa-solid fa-user"></i></span>
                    </div>
                    <div className="input-field">
                        <input type="email" 
                        id='email'
                        placeholder=' '
                        autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                        <span><i className="fa-solid fa-at"></i></span>
                    </div>
                    <div className="input-field">
                        <input type="password"
                        id='password'
                        placeholder=' '
                        onChange={(e) => setPassword(e.target.value)}
                         />
                        <label htmlFor="password">Password</label>
                        <span><i className="fa-solid fa-lock"></i></span>
                    </div>
                    <div className="input-field link">
                        <Link to="/login">have account?Login</Link>
                    </div>
                    <div className="input-field">
                        <Link onClick={handleSignup} className='btn'>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup