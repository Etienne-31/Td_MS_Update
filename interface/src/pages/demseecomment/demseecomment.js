import './demseecomment.css'
import React, {useEffect, useState} from "react";


function Demseecomment() {

    const userName = localStorage.getItem('userName');
    const [comments, setComments] = useState([]);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
        if (confirmLogout) {
            // Logique de déconnexion ici
            localStorage.removeItem('userName'); // Supprimez le nom d'utilisateur du stockage local si nécessaire
            window.location.href = '/'; // Redirigez vers la page d'accueil
        }
    };

    const handleReturn = () => {
        if (window.confirm("Êtes-vous sûr de vouloir revenir en arrière ?")) {

            window.location.href = '/menudem'; // Redirigez vers la page d'accueil
        }
    };

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await fetch(`http://localhost:8084/getAllCommentsFromUser/${userName}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setComments(data);
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
                <h1 className="display">Affichage de vos commentaire : {userName} </h1>
            </div>
            <button onClick={handleLogout} className="logoutButton">
                Déconnexion
            </button>
            <button className="return-button" onClick={handleReturn}>
                Retour en arrière
            </button>
            <div className="missions-list">
                <div className="mission-header">
                    <span>Note</span>
                    <span>Commentaire</span>

                </div>
                {comments.map((comment) => (
                    <div  className="mission-item" >
                        <span>{comment.notation}</span>
                        <span>{comment.comment}</span>

                    </div>
                ))}
            </div>



        </div>


    );
}

export default Demseecomment;