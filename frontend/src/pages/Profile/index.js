import React, {useState,useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/e3.png';

export default function Profile() {
    const [games, setGames] = useState([]);
    const history = useHistory();

    const E3_id = localStorage.getItem('E3_id');
    const enterprise = localStorage.getItem('enterprise');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: E3_id, 
            }
        }).then(response => {
            setGames(response.data);
        })
    }, [E3_id]);

async function handleDeleteGame(id) {
    try {
        await api.delete(`games/${id}`, {
            headers: {
              Authorization: E3_id,  
            }
        });

        setGames(games.filter(games => games.id != id));
    }catch (err) {
        alert('Failed in delete, try again.');
    }
}

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
              <img src= {logoImg} alt="E3" />
              <span>Welcome {enterprise}</span>

              <Link className="button" to="/games/new">Register new game</Link>
              <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#778899"/>
              </button>
            </header>
            <h1>Registered games</h1>

            <ul>
                {games.map(game => (

                <li key= {game.id}>
                    <strong>GAME:</strong>
                    <p>{game.title}</p>

                    <strong>DESCRIPTION:</strong>
                    <p>{game.description}</p>

                    <strong>VALUE:</strong>
                    <p>{Intl.NumberFormat('us-EN', {style: 'currency', currency: 'USD'}).format(game.value)}</p>

                    <button onClick={() => handleDeleteGame(game.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}
