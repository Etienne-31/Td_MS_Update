
import { BrowserRouter as Router, Route,Routes, Link,useLocation  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick'; // Assurez-vous d'installer ce package ou une alternative
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo from './aide.png';
import './App.css';
import SignUp from './pages/signeUp/signeUp';
import SignIn from './pages/signeIn/signeIn';
import Menubene from './pages/menubene/menubene';
import Menudem from './pages/menudem/menudem';
import Menuvali from './pages/menuvali/menuvali';
import Displaymissionbene from './pages/displaymissionbene/displaymissionbene';
import Displaymissiondem from './pages/displaymissiondem/displaymissiondem';
import Displaymissionvali from './pages/displaymissionvali/displaymissionvali';
import Beneaccept from './pages/beneaccept/beneaccept';
import Displayrating from './pages/displayrating/displayrating';
import Demmodify from './pages/demmodifymission/demmodifymission';
import Dempost from './pages/dempostmission/dempostmission';
import Valijudge from './pages/valijudge/valijudge';
import Dempostcomment from './pages/dempostcomment/dempostcomment';
import Demseecomment from './pages/demseecomment/demseecomment';


function Home() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8084/getAllComments')
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error(error));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };

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
                <div className="home-container">
                    <Slider {...settings}>
                        {comments.map((comment, index) => (
                            <div key={index} className="comment-container">
                                <p className="comment-author">Créateur: {comment.creator}</p>
                                <p className="comment-note">Note: {comment.notation}/20</p>
                                <p className="comment-text">Commentaire: {comment.comment}</p>
                            </div>
                        ))}
                    </Slider>
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
                    <Route path="/menubene" element={<Menubene />} />
                    <Route path="/menudem" element={<Menudem />} />
                    <Route path="/menuvali" element={<Menuvali />} />
                    <Route path="/displaymissionbene" element={<Displaymissionbene />} />
                    <Route path="/displayrating" element={<Displayrating />} />
                    <Route path="/displaymissiondem" element={<Displaymissiondem />} />
                    <Route path="/displaymissionvali" element={<Displaymissionvali />} />
                    <Route path="/beneaccept" element={<Beneaccept />} />
                    <Route path="/demmodify" element={<Demmodify />} />
                    <Route path="/dempost" element={<Dempost />} />
                    <Route path="/valijudge" element={<Valijudge />} />
                    <Route path="/dempostcomment" element={<Dempostcomment />} />
                    <Route path="/demseecomment" element={<Demseecomment />} />
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