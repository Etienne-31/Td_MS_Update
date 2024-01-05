import './menubene.css';
import React, { useState, useEffect } from 'react';



function Menubene() {


    const userName = localStorage.getItem('userName');

    const handleLogout = () => {
        const confirmLogout = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
        if (confirmLogout) {
            // Logique de déconnexion ici
            localStorage.removeItem('userName'); // Supprimez le nom d'utilisateur du stockage local si nécessaire
            window.location.href = '/'; // Redirigez vers la page d'accueil
        }
    };

    const [missions, setMissions] = useState([]);


    useEffect(() => {
        const fetchMissions = async () => {
            const response = await fetch('http://localhost:8083/getAllMissionByStatus/ACCEPTED');
            const data = await response.json();
            setMissions(data);
        };

        fetchMissions();
    }, []);

    const handleMissionSelect = (idMission) => {
        localStorage.setItem('idMissionSelected', idMission);
        window.location.href = '/displaymissionbene';
    };



    return(
        <div className="container">
            <div className="userDisplay">
                <h1>Bénévole :  {userName} </h1>
            </div>
            <button onClick={handleLogout} className="logoutButton">Déconnexion</button>
            <div className="missions-list">
                <div className="mission-header">
                    <span>ID</span>
                    <span>Intitulé</span>
                    <span>Demandeur</span>
                    <span>Lieu</span>
                </div>
                {missions.map((mission) => (
                    <div key={mission.idMission} className="mission-item" onClick={() => handleMissionSelect(mission.idMission)}>
                        <span>{mission.idMission}</span>
                        <span>{mission.intituleMission}</span>
                        <span>{mission.emetteur}</span>
                        <span>{mission.location}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menubene;