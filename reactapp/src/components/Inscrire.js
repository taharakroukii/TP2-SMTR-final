import {NavLink} from "react-router-dom";
import Form from "react-bootstrap/Form";
import {Button, Col} from "react-bootstrap";
import {useState} from "react";
import Axios from "axios";

function Inscrire() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        message: 'Créer un nouvel utilisateur',
        etat: false
    })
    const [invalidUser, invalidPass] = [ values.username.length <1, values.password.length <4]


    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value,
            message: 'Créer un nouvel utilisateur',
            etat: false})
    }
    Axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault();

        if (new RegExp("\\w+\\s?").test(values.username) && new RegExp("\\w{4,}").test(values.password)) {
            // samba-taha-node-tp2.onrender.com
            Axios.post("https://samba-taha-node-tp2.onrender.com/addUser", {nom: values.username, motdepasse: values.password})
                .then((response) => {
                    console.log(response.data);
                    setValues({...values, message: "L'ajout a bien été rétablit!", etat: true})
                }).catch(error => console.log(error));
        }
    };


    return (
        <div>
            <h1>S'inscrire</h1>
            <p style={values.etat ?{ color:"forestgreen", fontStyle:"oblique"}:{ color:"black"}}>
                {values.message}
            </p>

                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} className="mb-3" >
                            <Form.Label htmlFor="username">Nom d'utilisateur</Form.Label>
                            <Form.Control name="username"
                                          type="text"
                                          value={values.username}
                                          onChange={handleChange}
                                          isValid={!invalidUser}
                                          isInvalid={!!invalidUser}
                                          required></Form.Control>
                            <Form.Control.Feedback type="invalid">Au moins un caractère alphanumériques avec ou sans espace de valide</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="password">Mot de passe</Form.Label>
                            <Form.Control name="password"
                                          type="password"
                                          value={values.password}
                                          onChange={handleChange}
                                          isValid={!invalidPass}
                                          isInvalid={!!invalidPass}
                                          required></Form.Control>
                            <Form.Control.Feedback type="invalid">Au moins 4 caractères alphanumériques ou underscore de valide</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Text>
                                Si votre compte existe déjà,&nbsp;
                                <NavLink to="/connecter">Connectez-vous</NavLink>
                                &nbsp;ici
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={invalidPass || invalidUser}>
                            Continuer
                        </Button>
                    </Form>
        </div>
    );
}

export default Inscrire;