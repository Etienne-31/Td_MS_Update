import './menudem.css';
import React, {useEffect, useState} from "react";


function Menudem() {



    const userName = localStorage.getItem('userName');
    const [missions, setMissions] = useState([]);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
        if (confirmLogout) {
            // Logique de déconnexion ici
            localStorage.removeItem('userName'); // Supprimez le nom d'utilisateur du stockage local si nécessaire
            window.location.href = '/'; // Redirigez vers la page d'accueil
        }
    };

    const handlePost = () => {
        const confirmLogout = window.confirm("Vous allez poster une mission ?");
        if (confirmLogout) {
            window.location.href = '/dempost'; // Redirigez vers la page d'accueil
        }
    };

    const handlePostComment = () => {
        const confirmLogout = window.confirm("Vous allez poster un commentaire ?");
        if (confirmLogout) {
            window.location.href = '/dempostcomment'; // Redirigez vers la page d'accueil
        }
    };

    const handleSeeComment = () => {
            window.location.href = '/demseecomment'; // Redirigez vers la page d'accueil
    };




    const handleMissionSelect = (idMission) => {
        localStorage.setItem('idMissionSelected', idMission);
        window.location.href = '/displaymissiondem';
    };

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await fetch(`http://localhost:8080/getAllMissionFromEmetteur/${userName}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setMissions(data);
                } else {
                    console.error('Data is not an array', data);
                }
            } catch (error) {
                console.error('Error fetching missions', error);
            }
        };

        fetchMissions();
    }, [userName]); // Assuming userName is a dependency of this effect

    return(
        <div className="container">
            <div className="userDisplay">
                <h1 className="display"> Affichage de vos missions :  {userName} </h1>
            </div>
            <button onClick={handleLogout} className="logoutButton">Déconnexion</button>
            <button onClick={handlePost} className="PostButton">Poster une mission</button>
            <button onClick={handlePostComment} className="PostCommentButton">Poster un commentaire</button>
            <button onClick={handleSeeComment} className="SeeCommentButton">Voir mes commentaires</button>
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

export default Menudem;