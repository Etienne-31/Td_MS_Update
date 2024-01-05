import './valijudge.css';
import React, { useState } from 'react';

function Valijudge() {
    const userName = localStorage.getItem('userName');
    const idMissionSelected = localStorage.getItem('idMissionSelected');
    const intituleMission = localStorage.getItem('intituleMission');
    const [comment, setComment] = useState('');

    const handleReturn = () => {
        if (window.confirm("Êtes-vous sûr de vouloir revenir en arrière ?")) {
            localStorage.removeItem('intituleMission');
            localStorage.removeItem('idMissionSelected');
            window.location.href = '/displaymissionvali';
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

    const Validate = async () => {
        if (window.confirm("Voulez-vous vraiment finir la mission ?")) {
            try {
                await fetch(`http://localhost:8083/updateMissionCommentaire/${idMissionSelected}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ comment })
                });
                await fetch(`http://localhost:8083/updateMissionStatus/${idMissionSelected}/ACCEPTED`, {
                    method: 'PUT'
                });
                window.location.href = '/menuvali';
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const Refuse = async () => {
        if (window.confirm("Voulez-vous vraiment finir la mission ?")) {
            try {
                await fetch(`http://localhost:8083/updateMissionCommentaire/${idMissionSelected}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ comment })
                });
                await fetch(`http://localhost:8083/updateMissionStatus/${idMissionSelected}/REFUSED`, {
                    method: 'PUT'
                });
                window.location.href = '/menuvali';
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
            <button className="left-centered-buttonV" onClick={Validate}>
                Valider
            </button>
            <button className="left-centered-buttonD" onClick={Refuse}>
                Refuser
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

export default Valijudge;