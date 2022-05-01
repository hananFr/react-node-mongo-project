import Axios from 'axios';
import React, { useState } from 'react';
import { apiUrl } from '../../config.json'
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
const axios = require('axios')

function ImageForm(props) {
    const [image, setImage] = useState({});
    const [count, setCount] = useState(props);



    function onSubmit(e) {
        e.preventDefault();
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        if (image) {
            const formData = new FormData();
            formData.append('image', image)
            formData.append('num', '123')



            Axios.post(`${apiUrl}/images/uploads`, formData, config)
                .then((res) => {
                    toast('התמונה הוספה בהצלחה')

                }).catch((err) => {
                    toast('you have a problem')
                })
        }
    }




    return (

        <form onSubmit={() => onSubmit} autoComplete="off" method="PUT" action="/:id">
            <label htmlFor="image">הוסף תמונה</label>
            <input type="file" name='image' id='image' accept='image/*' onChange={(e) => {
                setImage(e.target.files[0])
            }} />


            <Button
                variant="warning"
                type="submit"
                id="createCardBtn"
                name="image"
                onClick={(e) => {
                    e.preventDefault();
                    const formData = new FormData()
                    formData.append('image', image)
                    formData.append('num', '123')
                    const config = {
                        headers:
                            { 'Content-Type': 'multipart/form-data' }
                    }

                    axios.post(`http://localhost:3900/api/images/uploads`, formData, config)
                        .then((response) => {
                            toast('התמונה נוספה למאגר!')
                            window.location.href = 'http://localhost:3000/'
                        }).catch((error) => {

                            toast('Error!')

                        })
                }
                } >שלח</Button>
        </form>
    )
}

export default ImageForm