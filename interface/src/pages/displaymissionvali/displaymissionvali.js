import './displaymissionvali.css';
import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import 'leaflet/dist/leaflet.css';

const center = { lat: 43.6045, lng: 1.444 };

function Displaymissionvali() {


    const userName = localStorage.getItem('userName');
    const idMissionSelected = localStorage.getItem('idMissionSelected');
    const [mission, setMission] = useState(null);
    const [position, setPosition] = useState(center);




    const handleReturn = () => {
        const confirmLogout = window.confirm("Êtes-vous sûr de vouloir revenir en arrière ?");
        if (confirmLogout) {
            // Logique de déconnexion ici
            localStorage.removeItem('idMissionSelected'); // Supprimez le nom d'utilisateur du stockage local si nécessaire
            window.location.href = '/menuvali'; // Redirigez vers la page d'accueil
        }
    };

    const handleAcceptMission = () => {
        // Logic for accepting the mission
        console.log('Mission accepted!');
        window.location.href = '/valijudge';
    };


    const handleLogout = () => {
        const confirmLogout = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
        if (confirmLogout) {
            // Logique de déconnexion ici
            localStorage.removeItem('userName'); // Supprimez le nom d'utilisateur du stockage local si nécessaire
            localStorage.removeItem('idMissionSelected'); // Supprimez le nom d'utilisateur du stockage local si nécessaire
            window.location.href = '/'; // Redirigez vers la page d'accueil
        }
    };

    useEffect(() => {
        // Fetch mission data and then geocode the location to get lat/lng
        fetch(`http://localhost:8083/getMissionById/${idMissionSelected}`)
            .then((response) => response.json())
            .then((missionData) => {
                setMission(missionData);
                // Only proceed to geocode if the location is available
                console.log(missionData.location)
                if (missionData.location) {
                    const apiKey = 'AIzaSyCZQzlTF4uBNgTkd-dshIBWqV8OUJeLCyI'; // Replace with your actual API key
                    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(missionData.location)}&key=${apiKey}`);
                }
                throw new Error('Location is undefined');
            })
            .then((response) => response.json())
            .then((geocodeData) => {
                if (geocodeData.status === "OK") {
                    setPosition(geocodeData.results[0].geometry.location);
                } else {
                    console.error("Geocoding failed:", geocodeData.status);
                }
            })
            .catch((error) => console.error("Error", error));
    }, [idMissionSelected]);
    return(
        <div className="container">
            <div className="userDisplay">
                <h1>Validateur : {userName}</h1>
            </div>
            <button onClick={handleLogout} className="logoutButton">Déconnexion</button>
            <button className="return-button" onClick={handleReturn}>Retour en arrière</button>
            {mission && (
                <div className="mission-info">
                    <h2 className="mission-title">Intitulé de mission : {mission.intituleMission}</h2>
                    <p>ID de mission : {mission.idMission}</p>
                    <p>Demandeur : {mission.emetteur}</p>
                    <p>Accepteur : {mission.accepteur}</p>
                    <p>Lieu : {mission.location}</p>
                    <p className="comment-section">Commentaire : {mission.commentaire}</p>
                    <button className="accept-button" onClick={handleAcceptMission}>Decision sur la mission</button>
                    <LoadScript googleMapsApiKey="AIzaSyCC2vjj6oBa4M7Op9AMMTKDmCtNSVgk9aQ">
                        <GoogleMap
                            mapContainerClassName="mapContainerStyle"
                            center={position}
                            zoom={15}
                            key={position.lat + '_' + position.lng} // Clé unique basée sur la position
                        >
                            <Marker position={position} label={'Position demandeur'} visible={true} />
                        </GoogleMap>
                    </LoadScript>
                </div>

            )}
        </div>

    );
}

export default Displaymissionvali;