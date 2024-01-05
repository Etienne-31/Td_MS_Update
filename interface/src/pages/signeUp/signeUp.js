import './signeUp.css';
import {useState} from "react";
import { Link } from 'react-router-dom';



function SignUp() {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState(''); // État pour stocker l'option sélectionnée


    const handleSubmit = async (event) => {
        event.preventDefault();
        let baseUrl = 'http://localhost:8080';
        let requestUrl = ''

        // Déterminez l'URL de la requête en fonction de l'option sélectionnée
        switch (selectedOption) {
            case '1': // Bénévole
                requestUrl = `${baseUrl}/addBenevole/${pseudo}/${password}`;
                break;
            case '2': // Valideur
                 requestUrl = `${baseUrl}/addValideur/${pseudo}/${password}`;
                break;
            case '3': // Demandeur
                requestUrl = `${baseUrl}/addDemandeur/${pseudo}/${password}`;
                break;
            default:
                alert('Veuillez sélectionner un rôle.');
                return;
        }
        console.log("utilisateur : "+pseudo)



        // Exécutez la requête HTTP
        try {
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            console.log("response : "+result)
            console.log("result.success : "+result.success)
            // Gérer la réponse
            if (result === true) {
                console.log('succes')
                // Redirection vers la page d'accueil si succès
                window.location.href = '/'; // Assurez-vous que cela correspond à votre route d'accueil
            }
            else if(result === false){
                // Afficher un message d'erreur si échec
                alert('Il y a eu un problème lors de l\'inscription ou le pseudo est déjà pris.');
            }
            else{
                alert('error');
            }
        } catch (error) {
            // Gérer les erreurs de réseau / serveur
            alert('Erreur de réseau ou serveur.');
        }
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value); // Met à jour l'option sélectionnée lorsque l'utilisateur change la sélection
    };

    return (
        <div className="signup-container">
            <Link to="/" className="retour-accueil">Retour à l'accueil</Link>
            <h2>Inscription</h2>
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
                <label>
                    Choisissez une option :
                    <select value={selectedOption} onChange={handleSelectChange} className="dropdown">
                        <option value="">Sélectionnez votre rôle</option>
                        <option value="1">Bénévole</option>
                        <option value="2">Valideur</option>
                        <option value="3">Demandeur</option>
                    </select>
                </label>

                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default SignUp;