import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap";
import Accueil from "./components/Accueil";
import Inscrire from "./components/Inscrire";
import Connecter from "./components/Connecter";
import Calendrier from "./components/Calendrier";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {useEffect, useState} from "react";
import Axios from "axios";

//deploiement : https://tp2-deploiement-react-sm-tr.vercel.app
function App() {
    const [logNav, setLogNav] = useState("");
    const [loggedUser, setLoggedUser] = useState(undefined)
    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("https://samba-taha-node-tp2.onrender.com/login").then((response) => {
            setLoggedUser(response.data.estConnecte === true ? response.data.utilisateur : undefined);
            setLogNav(loggedUser!==undefined ? '/calendrier' : '/');
        })
    }, [loggedUser])

    return (
        <div className="App">
            <BrowserRouter>

                <Navbar user={loggedUser} nav={logNav} />

                <Container className='navBar'>
                    <Routes>
                        <Route exact path="/inscrire" element={<Inscrire />} />
                        <Route exact path="/connecter" element={<Connecter />} />
                        <Route exact path="/" element={<Accueil />} />
                        <Route path="/calendrier" element={<Calendrier user={loggedUser}/>} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
