import './dempostcomment.css'
import React, {useState} from "react";


function Dempostcomment() {

    const userName = localStorage.getItem('userName');
    const [Note, setNote] = useState('');
    const [comment, setComment] = useState('');

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


    const handleSubmit = () => {
        if (!Note || !comment) {
            alert('Veuillez remplir tous les champs correctement.');
            return;
        }

        const noteValue = parseInt(Note, 10);
        if(noteValue > 20){
            alert('Vous ne pouvez pas mettre une note supérieur à 20');
            return;
        }

        // Utilisez une nouvelle variable au lieu de réaffecter 'comment'
        const commentToSend = `${Note}-${userName}`;
        fetch(`http://localhost:8080/sendComment/${commentToSend}`, {
            method: 'POST', // Changed to POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({comment: comment}), // Assurez-vous que le corps de la requête est correct
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Réponse réseau non ok.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                window.location.href = '/demseecomment';
            })
            .catch((error) => {
                alert(error.message);
            });
    };



    return(
        <div className="container">
            <div className="userDisplay">
                <h1 className="display"> {userName} </h1>
            </div>
            <button onClick={handleLogout} className="logoutButton">
                Déconnexion
            </button>
            <button className="return-button" onClick={handleReturn}>
                Retour en arrière
            </button>
            <div className="input-group">
                <label>Donnez une note sur 20 </label>
                <input
                    type="text"
                    value={Note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <textarea
                    className="comment-area"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                />
                <button className="submit-button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>





        </div>


    );
}

export default Dempostcomment;