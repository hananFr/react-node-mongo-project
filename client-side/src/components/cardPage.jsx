import Axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useParams, } from "react-router-dom";
import { apiUrl } from '../config.json'
import { toast } from "react-toastify";
import { getCard } from "../services/cardService";
import { getCurrentUser } from "../services/userService";


function CardPage(props) {
    const [card, setCard] = useState();
    let {id} = useParams(props)
    const setData = async () => {
        const { data } = await getCard(id)
        setCard(data);
    }

    const [admin, setAdmin] = useState(false)
    const getAdmin = () => {
        const setUser = getCurrentUser();
        (setUser) ? setAdmin(setUser.admin) : setAdmin(false);    
    }

    
    const deleteCard = () => {
        Axios.delete(`${apiUrl}/cards/${card._id}`).then((res) => {
            toast('המחיקה הושלמה');
            props.history.replace('/my-cards');
        })
    }

    const submit = () => {
        return (<div>
            {confirmAlert({
                title: 'מחיקת טיול',
                message: 'אתה בטוח שאתה רוצה למחוק את הטיול?',
                buttons: [
                    {
                        label: 'מחק',
                        onClick: () => (deleteCard())
                    },
                    {
                        label: 'בטל מחיקה',
                        onClick: () => confirmAlert({
                            message: 'המחיקה בוטלה',
                            buttons: [{
                                label: 'אישור',
                                onClick: () => window.location.href = '/'
                            }]
                        })
                    }
                ]
            })
            }
        </div>)
    };
    useEffect(() => {
        setData();
        getAdmin();


    }, [])

    


    if (card) {

        return (
            <React.Fragment>

                <div className="col-10 col-lg-8 mx-auto mt-3 text-right">
                    <div className="card">

                        <img
                            className="p-2"
                            src={`http://localhost:3900/api/cards/my-cards/${id}`}
                            width="100%"
                            alt={card.travelName}
                            height="50%"
                        />

                        <div className="card-body col- text-center mx-auto">
                            <h5 className="card-title">{card.travelName}</h5>
                            <p className="card-text border-top pt-2">
                                <b>למי הטיול? </b>
                                {card.travelCategory}

                                <br />
                                <b>מקום מפגש:</b>
                                {card.travelAddress}
                                <br />
                                <br />
                                <b>קצת על הטיול:</b>
                                <br />
                                {card.travelDescription}
                            </p>
                            <br></br>
                            <br></br>
                            {admin && (
                                <Link to={`/my-cards/update/${card._id}`} ><button className="link-btn btn btn-muted text-info">ערוך כרטיס</button></Link>
                            )}
                            {admin && (
                                <button className="link-btn btn btn-muted text-info" onClick={submit}>
                                    מחק כרטיס
                                </button>
                            )}

                        </div>
                    </div>
                </div >

            </React.Fragment>
        )
    }
    else { return null }

}

export default CardPage