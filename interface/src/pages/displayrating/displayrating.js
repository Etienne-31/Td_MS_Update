import './displayrating.css';


function Displayrating() {


    const userName = localStorage.getItem('userName');

    const handleReturn = () => {
        const confirmLogout = window.confirm("Êtes-vous sûr de vouloir revenir en arrière ?");
        if (confirmLogout) {
            // Logique de déconnexion ici
            window.location.href = '/'; // Redirigez vers la page d'accueil
        }
    };



    return(
        <div className="container">
            <div className="userDisplay">
                <h1>Bénévole :  {userName} </h1>
            </div>
            <button className="return-button" onClick={handleReturn}>Retour en arrière</button>
        </div>
    );
}

export default Displayrating;