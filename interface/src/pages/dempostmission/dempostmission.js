import './dempostmission.css';
import React, { useState } from 'react';

function Dempost() {
    const userName = localStorage.getItem('userName');
    const [intitule, setIntitule] = useState('');
    const [localisation, setLocalisation] = useState('');

    const handleReturn = () => {
        if (window.confirm("Êtes-vous sûr de vouloir revenir en arrière ?")) {

            window.location.href = '/menudem'; // Redirigez vers la page d'accueil
        }
    };

    const handleLogout = () => {
        if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
            localStorage.removeItem('userName'); // Supprimez le nom d'utilisateur du stockage local si nécessaire
            window.location.href = '/'; // Redirigez vers la page d'accueil
        }
    };

    const handleSubmit = () => {
        if (!intitule || !localisation) {
            alert('Veuillez remplir tous les champs correctement.');
            return;
        }

        const mission = `${userName}-${intitule}-${localisation}`;
        fetch(`http://localhost:8083/PostMission/${mission}`, {
            method: 'POST', // Changed to POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, intitule, localisation }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data) { // Assuming 'data' is true if the request was successful
                    window.location.href = '/menudem';
                } else {
                    throw new Error('Une erreur est survenue. Veuillez réessayer.');
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="container">
            <div className="userDisplay">
                <h1>{userName}</h1>
            </div>
            <div className="input-group">
                <label>Intitulé de Mission</label>
                <input
                    type="text"
                    value={intitule}
                    onChange={(e) => setIntitule(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label>Localisation</label>
                <input
                    type="text"
                    value={localisation}
                    onChange={(e) => setLocalisation(e.target.value)}
                />
            </div>
            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>
            <button onClick={handleLogout} className="logoutButton">
                Déconnexion
            </button>
            <button className="return-button" onClick={handleReturn}>
                Retour en arrière
            </button>
        </div>
    );
}

export default Dempost;