import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/e3.png';

export default function NewGame() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const E3_id = localStorage.getItem('E3_id');

    async function handleNewGame(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('games', data, {
                headers: {
                    Authorization: E3_id,
                }
            })

            history.push('/profile');
        } catch (error) {
            alert('Error in register, try again.')
        }
    }

    return (
        <div className="new-game-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="E3" />

                    <h1>Register a new game</h1>
                    <p>Game description to attract the audiences.</p>
                    <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041"/>
                            Back to home    
                    </Link> 
                </section>
                <form onSubmit= {handleNewGame}>
                    <input 
                        placeholder="Game title"
                        value= {title}
                        onChange= {e => setTitle(e.target.value)} 
                    />

                    <textarea 
                        placeholder="Description" 
                        value= {description}
                        onChange= {e => setDescription(e.target.value)}
                    />

                    <input 
                        placeholder="Value in dollar" 
                        value= {value}
                        onChange= {e => setValue(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}