
import { BrowserRouter as Router, Route,Routes, Link,useLocation  } from 'react-router-dom';

import logo from './aide.png';
import './App.css';
import SignUp from './pages/signeUp/signeUp';
import SignIn from './pages/signeIn/signeIn';

function Home() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (

        isHomePage && (
            <div>
                <div>
                    <nav className="nav">
                        <Link to="/signup"><button className="button">Inscription</button></Link>
                        <Link to="/signin"><button className="button">Connexion</button></Link>
                    </nav>)
                    <div className="name-container">
                        <p>Application réalisée par Maillard Etienne et Othmane Slaoui </p>
                    </div>
                </div>
            </div>
        )

    );
}




export default function MyApp() {


    return (
        <Router>
            <h1>Application d'aide à la personne <img src={logo} alt="Logo" style={{ verticalAlign: 'middle' }} /></h1>
            <Home />
                <Routes> {/* Utilisez Routes ici */}
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                </Routes>
        </Router>
    );
}

















































/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/