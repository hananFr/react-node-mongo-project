import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import CardValid from "../services/validateService";
import React from "react";
import { useState } from "react";
import PageHeader from "./common/pageHeader";
const axios = require('axios')

const notify = (message) => toast(message);

function UpdateCardComp(props) {
    
    const [file, setFile] = useState()

    
    return (
        <div className="container-fluid text-center justify-content-center">
            <PageHeader titleText="צור טיול" />
            <Container className="form-container-create text-center justify-content-center col-md-6 col-lg-4">
                <Form>
                    <h4>
                        הכנס כאן את פרטי הטיול!
                    </h4>
                    <div className="form-fields-create justify-content-center">
                        <Form.Group
                            className="form-inputs-create"
                            controlId="formBasicTravelName"
                        >
                            <Form.Label>שם:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3 form-inputs-create"
                            controlId="formBasicTravelDescription"
                        >
                            <Form.Label>תיאור הטיול:</Form.Label>
                            <textarea name="travelDescription" className="form-control" id="formBasicTravelDescription" cols="30" rows="5"></textarea>
                        </Form.Group>
                        <Form.Group
                            className="mb-3 form-inputs-create"
                            controlId="formBasicTravelAddress"
                        >
                            <Form.Label>כתובת:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group
                            className="mb-3 form-inputs-create"
                            controlId="formBasicTravelCategory"
                        >
                            <Form.Label>קטגוריה:</Form.Label>
                            <br />
                            <Form.Select className="form-select form-select-lg mb-3" defaultValue='בחר קטגוריה' aria-label=".form-select-lg example">
                                <option value="בתי ספר">בתי ספר</option>
                                <option value="זוגות">זוגות</option>
                                <option value="משפחות">משפחות</option>
                                <option value="קבוצות">קבוצות</option>

                            </Form.Select>
                        </Form.Group>

                        <Form.Group
                            className="mb-3 form-inputs-create"
                            controlId="formBasicTravelImage"
                        >
                            <Form.Label>בחר קובץ: </Form.Label>
                            <input type="file" name="travelImage" id="travelImage" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                        </Form.Group>

                        <Button
                            variant="warning"
                            type="submit"
                            id="createCardBtn"
                            onClick={(e) => {
                                e.preventDefault();
                                const config = {
                                    headers:
                                        { 'Content-Type': 'multipart/form-data', }
                                }
                                let cardValidate = CardValid(
                                    "formBasicTravelName",
                                    "formBasicTravelDescription",
                                    "formBasicTravelAddress",
                                    "formBasicTravelCategory",

                                );
                                if (typeof cardValidate == "string") {
                                    notify(cardValidate);
                                } else {
                                    const formData = new FormData()
                                    formData.append('travelName', cardValidate.travelName)
                                    formData.append('travelDescription', cardValidate.travelDescription)
                                    formData.append('travelAddress', cardValidate.travelAddress)
                                    formData.append('travelCategory', cardValidate.travelCategory)
                                    formData.append('travelImage', file)
                                    axios.post(`http://localhost:3900/api/cards/uploads`, formData, config)
                                        .then((response) => {
                                            toast('הוספת טיול חדש')
                                            props.history.replace('/my-cards')
                                        }).catch((error) => {
                                            toast(error)
                                        });
                                }
                            }}
                        >
                            הוסף טיול
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>

    );
}
export default (UpdateCardComp);