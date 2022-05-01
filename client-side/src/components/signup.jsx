import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import validateSimpleRegistration from "../services/userValid";
import { apiUrl } from '../config.json'
import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
const notify = (message) => toast(message);

function SimpleRegistrationComp({ text, clickHandler = (f) => f }) {
  return (
    <div className="text-center justify-content-center">
      <h1>הירשם לאתר!</h1>
      <Container className="form-container-simple text-center justify-content-center col-12 col-md-7 col-lg-5">
        <Form>
          <h4>מלא את השדות כדי להיות רשום באתר!</h4>
          <div className="form-fields-simple">
            <Form.Group
              className="mb-3 form-inputs-simple"
              controlId="formBasicEmail"
            >
              <Form.Label>אימייל:</Form.Label>
              <Form.Control type="email" placeholder="הכנס אימייל" />
            </Form.Group>
            <Form.Group
              className="mb-3 form-inputs-simple"
              controlId="formBasicPassword"
            >
              <Form.Label>סיסמא:</Form.Label>
              <Form.Control type="password" placeholder="בחר סיסמא" />
            </Form.Group>
            <Form.Group
              className="mb-3 form-inputs-simple"
              controlId="formBasicName"
            >
              <Form.Label>שם מלא:</Form.Label>
              <Form.Control type="text" placeholder="הקלד את שמך המלא" />
            </Form.Group>

            <Button
              id="signUpBtn"
              variant="warning"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                var validatioErrorOrData = validateSimpleRegistration(
                  "formBasicEmail",
                  "formBasicPassword",
                  "formBasicName"
                );
                if (typeof validatioErrorOrData == "string") {
                  notify(validatioErrorOrData);
                } else {
                  Axios.post(`${apiUrl}/users/`, validatioErrorOrData)
                    .then(notify('נרשמת בהצלחה!'))
                }
              }}
            >
              הירשם
            </Button>

            <div className="ReminderForAccount-simple">
              אתה רשום באתר <Link className="text-decoration-none" to="/signin">התחבר</Link>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default SimpleRegistrationComp;