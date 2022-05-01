import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import CardValid from "../services/validateService";
import React, { useEffect } from "react";
import { useState } from "react";
import PageHeader from "./common/pageHeader";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getCard } from "../services/cardService";
const axios = require('axios')
const notify = (message) => toast(message);

function UpdateCardComp(props) {
    const [card, setCard] = useState({});
    const [file, setFile] = useState();


    let { id } = useParams(props);

    const setTheCard = async () => {

        const { data } = await getCard(id);
        setCard(data)

    }

    useEffect(() => {
        setTheCard()
    }, [card])

    if (card) {
        return (
            <div className="container-fluid text-center justify-content-center">
                <PageHeader titleText={card.travelName} />
                <Container className="form-container-create text-center justify-content-center col-md-6 col-lg-4">
                    <Form>
                        <h4>
                            אתה יכול לעדכן כאן את פרטי הטיול!
                        </h4>
                        <div className="form-fields-create justify-content-center">
                            <Form.Group
                                className="form-inputs-create"
                                controlId="formBasicTravelName"
                            >
                                <Form.Label>שם:</Form.Label>
                                <Form.Control type="text" defaultValue={card.travelName} />
                            </Form.Group>

                            <Form.Group
                                className="mb-3 form-inputs-create"
                                controlId="formBasicTravelDescription"
                            >
                                <Form.Label>תיאור הטיול:</Form.Label>
                                <textarea name="travelDescription" defaultValue={card.travelDescription} className="form-control" id="formBasicTravelDescription" cols="30" rows="5"></textarea>
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-inputs-create"
                                controlId="formBasicTravelAddress"
                            >
                                <Form.Label>כתובת:</Form.Label>
                                <Form.Control type="text" defaultValue={card.travelAddress} />
                            </Form.Group>
                            <Form.Group
                                className="mb-3 form-inputs-create"
                                controlId="formBasicTravelCategory"
                            >
                                <Form.Label>קטגוריה:</Form.Label>
                                <br />
                                <Form.Select className="form-select form-select-lg mb-3" defaultValue={card.travelCategory} aria-label=".form-select-lg example">
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
                                        const formData = new FormData();
                                        formData.append('travelName', cardValidate.travelName);
                                        formData.append('travelDescription', cardValidate.travelDescription);
                                        formData.append('travelAddress', cardValidate.travelAddress);
                                        formData.append('travelCategory', cardValidate.travelCategory);
                                        if (file) formData.append('travelImage', file);

                                        formData.forEach((value, key) => {
                                        })
                                        axios.put(`http://localhost:3900/api/cards/${card._id}`, formData, config)
                                            .then((response) => {
                                                toast('הכרטיס עודכן בהצלחה!');
                                                props.history.replace('/my-cards');
                                            }).catch((error) => {
                                                notify(error);
                                            });
                                    }
                                }}
                            >
                                עדכן סיור
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>

        );
    }
    else return null;
}
export default UpdateCardComp;