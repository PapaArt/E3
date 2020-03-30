import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/e3.png';
import { useState } from 'react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        
        try {
            const response = await api.post('e3', data)

            alert(`Your access ID: ${response.data.id}`);

            history.push('/');
        } catch(error) {
            alert('Error, try again!!!');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                  <img src={logoImg} alt="E3" />

                  <h1>Sign Up</h1>
                  <p>Register your enterprise in the E3 site to present your games in event.</p>
                  <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Sign Up    
                  </Link> 
                </section>
                <form onSubmit= {handleRegister}>
                  <input 
                    placeholder="Enterprise name"
                    value = {name}
                    onChange = {e => setName(e.target.value)} 
                  />
                  <input type= "email" 
                    placeholder="E-mail"
                    value = {email}
                    onChange = {e => setEmail(e.target.value)} 
                  />
                  <input 
                    placeholder="WhatsApp"
                    value = {whatsapp}
                    onChange = {e => setWhatsapp(e.target.value)}
                  />
                  <div className="input-group">
                      <input 
                      placeholder="City" 
                      value = {city}
                      onChange = {e => setCity(e.target.value)}
                      />
                      <input 
                        placeholder="UF" 
                        style={{ width: 80 }}
                        value = {uf}
                        onChange = {e => setUF(e.target.value)} 
                    />
                  </div>

                  <button className="button" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}