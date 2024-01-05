import './demmodifymission.css';
import React, { useState, useEffect } from 'react';

function Demodify() {
    const userName = localStorage.getItem('userName');
    const idMissionSelected = localStorage.getItem('idMissionSelected');
    const [missionDetails, setMissionDetails] = useState({
        intituleMission: '',
        location: '',
    });

    const [editMode, setEditMode] = useState({
        intituleMission: false,
        location: false,
    });

    useEffect(() => {
        fetch(`http://localhost:8080/getMissionById/${idMissionSelected}`)
            .then((response) => response.json())
            .then((data) => {
                setMissionDetails({
                    intituleMission: data.intituleMission,
                    location: data.location,
                });
            });
    }, [idMissionSelected]);

    const handleInputIntituleChange = (e) => {
        const value = e.target.value;
        setMissionDetails((prevDetails) => ({
            ...prevDetails,
            intituleMission: value,
        }));
    };

    const handleInputLocationChange = (e) => {
        const value = e.target.value;
        setMissionDetails((prevDetails) => ({
            ...prevDetails,
            location: value,
        }));
    };

    const toggleEdit = (field) => {
        setEditMode((prevMode) => ({
            ...prevMode,
            [field]: !prevMode[field],
        }));
    };

    const handleSubmit = () => {
        if (missionDetails.intituleMission && missionDetails.location) {
            console.log(missionDetails);
        } else {
            alert('Veuillez remplir tous les champs correctement.');
        }
    };

    const handleReturn = () => {
        if (window.confirm("Êtes-vous sûr de vouloir revenir en arrière ?")) {
            localStorage.removeItem('idMissionSelected'); // Supprimez le nom d'utilisateur du stockage local si nécessaire
            window.location.href = '/menudem';
        }
    };

    const handleLogout = () => {
        if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
            localStorage.removeItem('userName'); // Supprimez le nom d'utilisateur du stockage local si nécessaire
            localStorage.removeItem('idMissionSelected'); // Supprimez le nom d'utilisateur du stockage local si nécessaire
            window.location.href = '/';
        }
    };

    return (
        <div className="container">
            <div className="userDisplay">
                <h1 className="user">{userName}</h1>
                <button className="return-button" onClick={handleReturn}>Retour en arrière</button>
                <button onClick={handleLogout} className="logoutButton">Déconnexion</button>
                {editMode.intituleMission ? (
                    <input
                        type="text"
                        value={missionDetails.intituleMission}
                        onChange={handleInputIntituleChange}
                        name="intituleMission"
                    />
                ) : (
                    <h2 onClick={() => toggleEdit('intituleMission')}>
                        Intitulé de mission : {missionDetails.intituleMission}
                    </h2>
                )}
                {editMode.location ? (
                    <input
                        type="text"
                        value={missionDetails.location}
                        onChange={handleInputLocationChange}
                        name="location"
                    />
                ) : (
                    <h2 onClick={() => toggleEdit('location')}>Localisation : {missionDetails.location}</h2>
                )}
                <button onClick={handleSubmit} className="submit-button">Confirmer les modifications</button>
            </div>
        </div>
    );
}

export default Demodify;
