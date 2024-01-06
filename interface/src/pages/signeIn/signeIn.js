import './signeIn.css';
import {useState} from "react";
import { Link } from 'react-router-dom';



function SignUp() {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();
        let baseUrl = 'http://localhost:8080';
        let requestUrl = `${baseUrl}/checkIdentity/${pseudo}/${password}`;




        // Exécutez la requête HTTP
        try {
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            console.log("password : "+password)
            console.log("result.success : "+result.success)
            // Enregistrez la valeur de `result` et du userName dans le stockage local
            localStorage.setItem('userRole', result);
            localStorage.setItem('userName', pseudo);

            // Gérer la réponse
            if (result === -1) {
                console.log('pas le bon mdp ')
                // Redirection vers la page d'accueil si succès
                alert('Il y a une erreur dans le pseudo ou mot de passe .');
            }
            else if (result === 1 ) {
                // Redirection vers la page d'accueil si succès
                window.location.href = '/menubene';
            }
            else if(result === 2){
                window.location.href = '/menuvali';
            }
            else if(result === 3){
                window.location.href = '/menudem';
            }

            else  {
                // Afficher une alerte si le résultat est un autre nombre
                alert('Il y a eu une erreur.');
            }
        } catch (error) {
            // Gérer les erreurs de réseau / serveur
            alert('Erreur de réseau ou serveur.');
        }
    };


    return (
        <div className="signup-container">
            <Link to="/" className="retour-accueil">Retour à l'accueil</Link>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="pseudo"
                    placeholder="Entrez votre pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Connexion</button>
            </form>
        </div>
    );
}

export default SignUp;