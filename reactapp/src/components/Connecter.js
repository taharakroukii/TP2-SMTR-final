import {useState} from 'react';
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import Axios from "axios";

function Connecter() {
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    Axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault();

        if (new RegExp("^.+").test(values.username) && new RegExp("\\w{4,}").test(values.password)) {
            Axios.post("https://samba-taha-node-tp2.onrender.com/login", {nom: values.username, motdepasse: values.password})
                .then((response) => {
                    response.data.msg ? console.log(response.data.msg) : console.log(response.data);
                    if (!response.data.msg) window.location.reload();
                })
        }
    };


    return (
        <div>
            <h1>Se Connecter</h1>
            <p>Connecter un utilisateur existant</p>
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="username">Nom d'utilisateur</Form.Label>
                    <Form.Control name="username"
                                  type="text"
                                  onChange={handleChange}
                                  isValid={values.username > 1}
                                  required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Mot de passe</Form.Label>
                    <Form.Control name="password"
                                  type="password"
                                  onChange={handleChange}
                                  isValid={values.password.length > 4}
                                  required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Text muted>Vons n'avez pas de compte ?&nbsp;
                        <NavLink to="/inscrire">Inscrivez-vous</NavLink>
                        &nbsp;ici</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Continuer
                </Button>
            </Form>
        </div>
    );
}

export default Connecter;