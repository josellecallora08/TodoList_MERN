import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './_Login.scss';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useUserContext } from '../hooks/useUserContext';
import { userbaseURL } from '../utils/constants';
import { useLoadingContext } from '../context/LoadingContext';
const Login = () => {
    document.title = "Login";

    // UseState
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Error, setError] = useState(null)

    // Define
    const navigate = useNavigate();

    // Hooks
    const { dispatch } = useUserContext();
    const {isLoading, setIsLoading} = useLoadingContext()


    const handleLogin = async () => {
      
        try{
            const response = await axios.post(`${userbaseURL}/login`, {
                Email: Email,
                Password: Password
            })
            const data = response.data
            setIsLoading(true);

            // Simulate the logout process (replace this with your actual logout logic)
             setTimeout(() => {
                localStorage.setItem("users", JSON.stringify(data))
                dispatch({
                    type: 'LOGIN',
                    payload: data
                })
                setError(null)
                navigate('/')    
                setIsLoading(false); // Hide loading state after logout
            }, 1000)
        }
        catch(error){
            if(error.response){
                const { data } = error.response;
                setError(data.error)
            }
        }
    }
        
    return (
        <div>
            <Navbar/>
           {isLoading ? <div className='loading'></div> :
            <div className='login-container'>
            <div className="wrapper">
            <div className="form-wrapper">
                <div className="input-field">
                    <h1>Login</h1>
                </div>
                {Error ? 
                <div className="errortext">
                {Error}
                </div> : ''}
                <div className="input-field">
                    <input type="email" 
                    id='email'
                    placeholder=' '
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
                <div className="input-field">
                    <Link to="/signup">Create Account</Link>
                </div>
                <div className="input-field">
                    <Link onClick={handleLogin} className='btn'>
                        Login
                    </Link>
                </div>
            </div>
            </div>
            </div>}
        </div>
    )
}

export default Login