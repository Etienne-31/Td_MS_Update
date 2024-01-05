import './beneaccept.css';
import React, { useState } from 'react';

function Beneaccept() {
    const userName = localStorage.getItem('userName');
    const idMissionSelected = localStorage.getItem('idMissionSelected');
    const intituleMission = localStorage.getItem('intituleMission');
    const [comment, setComment] = useState('');

    const handleReturn = () => {
        if (window.confirm("Êtes-vous sûr de vouloir revenir en arrière ?")) {
            localStorage.removeItem('idMissionSelected');
            localStorage.removeItem('intituleMission');
            window.location.href = '/menubene';
        }
    };

    const handleLogout = () => {
        if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
            localStorage.removeItem('userName');
            localStorage.removeItem('intituleMission');
            localStorage.removeItem('idMissionSelected');
            window.location.href = '/';
        }
    };

    const finalizeMission = async () => {
        if (window.confirm("Voulez-vous vraiment finir la mission ?")) {
            try {
                await fetch(`http://localhost:8080/updateMissionCommentaire/${idMissionSelected}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ comment })
                });
                await fetch(`http://localhost:8080/updateMissionStatus/${idMissionSelected}/DONE`, {
                    method: 'PUT'
                });
                window.location.href = '/menubene';
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="container">
            <div className="userDisplay">
                <h1>Bénévole : {userName}</h1>
                <h2>Intitulé de mission : {intituleMission}</h2>
            </div>
            <textarea
                className="comment-area"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
            />
            <button className="left-centered-button" onClick={finalizeMission}>
                Confirmer et finaliser
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

export default Beneaccept;