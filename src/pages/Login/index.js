import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/e3.png';

import publicImg from '../../assets/watch-dogs-4.png';

export default function Login() {
    const [id, setID] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('/sessions', {id});

            localStorage.setItem('E3_id', id);
            localStorage.setItem('enterprise', response.data.name);

            history.push('/profile');
        } catch(err) {
            alert('Login failed, try again.');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
               <img src = {logoImg} alt = "RegisterE3" />

                <form onSubmit= {handleLogin}>
                    <h1>Sign In</h1>

                    <input 
                        placeholder = "Your ID"
                        value = {id}
                        onChange = {e => setID(e.target.value)} 
                    />
                    <button className="button" type="submit">Log In</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Sign Up    
                    </Link>   
                </form>
            </section>

            <img src = {publicImg} alt = "Public" />
        </div>
    );
}