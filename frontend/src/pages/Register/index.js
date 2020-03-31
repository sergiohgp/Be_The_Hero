import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api'

import './styles.css';


import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [city,setCity] = useState('');
    const [province,setProvince] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            phone,
            city,
            province
        };

        try {
            const response = await api.post('ongs', data);
    
            alert(`Your access ID: ${response.data.id}`)

            history.push('/');

        } catch(err) {
            alert('Sign up error! Try again.')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Sign Up</h1>
                    <p>Sign up now. start the application to help people find your ONG's incidents.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size="16" color="#E02041"/>
                        Back
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="ONG Name" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)}/>

                    <div className="input-group">
                        <input placeholder="City" value={city} onChange={e => setCity(e.target.value)}/>
                        <input placeholder="ON" style={{ width: 80, }} value={province} onChange={e => setProvince(e.target.value)}/>
                    </div>
                    <button className="btn" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}