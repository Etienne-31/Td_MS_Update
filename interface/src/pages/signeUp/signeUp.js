import './signeUp.css';
import {useState} from "react";

function SignUp() {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState(''); // État pour stocker l'option sélectionnée
    const handleSubmit = (event) => {
        event.preventDefault();
        // Ici, vous intégrerez la logique d'envoi des données, comme une requête HTTP
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value); // Met à jour l'option sélectionnée lorsque l'utilisateur change la sélection
    };

    return (
        <div className="signup-container">
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
                        <option value="Demandeur">Option 1</option>
                        <option value="Bénévole">Option 2</option>
                        <option value="Valideur">Option 3</option>
                    </select>
                </label>

                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default SignUp;