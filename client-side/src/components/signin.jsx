import { Form, Button, Container } from "react-bootstrap";
import validateSignIn from "../services/loginValid";
import { toast } from "react-toastify";
import React from "react";
import { login } from "../services/userService";
import { useState } from "react";

const notify = (message) => toast(message);
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  return (
  <div className="text-center justify-content-center col-12 col-md-7 col-lg-5 mx-auto">
      <h1>דף התחברות</h1>
      <h3>התחבר על מנת להיות זמין לכל התכנים באתר!</h3>
      <Container className="form-container-login">

        <Form>
          <Form.Group
            className="mb-3 form-fields-login"
            controlId="formBasicEmail"
          >
            <Form.Label>אימייל</Form.Label>
            <Form.Control type="email" onChange={(e) =>{setEmail(e.target.value)}} />
          </Form.Group>
          <Form.Group
            className="mb-3 form-fields-login"
            controlId="formBasicPassword"
          >
            <Form.Label>סיסמא</Form.Label>
            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
            
          </Form.Group>
          <br></br>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {              
              e.preventDefault();
              var error = validateSignIn(email, password);
              if (typeof validateSignIn == "string") {
                notify(error);
              } else {
                login(
                  email,
                  password
                )
              }
            }}
          >
            Login
          </Button>
        </Form>
      </Container>
    
    </div>
  );
}
export default Login;