import {useContext, useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {Button, Card} from "react-bootstrap";
import Axios from "axios";

function Navbar(props) {
    Axios.defaults.withCredentials = true;
    const nav = useNavigate();
    const contextNav = props.nav

    const procederDeconnexion= () => {
        Axios.get("https://samba-taha-node-tp2.onrender.com/logout").then(response => console.log(response.data))
    }

    // eslint-disable-next-line
    useEffect(() =>  nav(contextNav), [contextNav]);


    return (
        <nav className="navBar" >
            <ul>
                <NavLink exact to="/">Accueil</NavLink>
                {(props.user !== undefined) ?
                    <NavLink to="/calendrier">Calendrier</NavLink>:
                    <NavLink to="/inscrire">S'inscrire</NavLink>
                }
                {(props.user !== undefined) ?
                    <Button variant="danger" onClick={procederDeconnexion}>Déconnexion</Button>:
                    <NavLink to="/connecter">Se connecter</NavLink>
                }
                <li><Card variant='info' style={{ width: '9rem', marginLeft:'10ch'}} >
                    <Card.Body>
                        <Card.Text> {(props.user !== undefined) ? <strong>{props.user.Full_Name}</strong> :<i>Non Connecté</i> }</Card.Text>
                    </Card.Body>
                  </Card></li>
            </ul>
        </nav>
    );
}

export default Navbar;