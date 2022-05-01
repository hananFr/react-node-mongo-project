import Axios from "axios";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/userService";
import ImageForm from "./imageForm";
import SliderImage from "./imageSlider";

function Slider(props) {

    const [images, setImages] = useState('');
    const [pic, setPic] = useState({})
    const [count, setCount] = useState(0);
    const [user, setUser] = useState({});






    const onBtn = (req, def, res) => {
        (res) ? setCount(req) : setCount(def)
    }


    const setMePic = (image, src) => {
        (images.length >= 0) ? setPic(image) : setPic(src)
    }
    const getImages = async (req, callback) => {
        const res = await Axios.get(req)
        setImages(res.data)
        setMePic(res.data[count])
    }
    const setMeUser = (user) => {
        setUser(user);
    }

    const getAdmin = getCurrentUser()

    useEffect(() => {
        getImages((`http://localhost:3900/api/images/get`));
        if (getAdmin) setMeUser(getAdmin)
    }, [count])

    if (images && pic) {


        return (
            <div id="carouselExampleControls" className="justify-content-center align-center text-center carousel-slide mx-auto" data-bs-ride="carousel">
                <div className="carousel-inner col-12 mx-auto mt-5">
                    {images.map(image => <SliderImage image={image} key={image._id} pic={pic}></SliderImage>)}
                    <div className="my-auto">
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"
                            onClick={() => {
                                onBtn(count - 1, images.length - 1, count > 0)
                                getImages(`http://localhost:3900/api/images/get`)
                            }}
                        >
                            <span className="carousel-control-prev-icon p-3" aria-hidden="true"></span>

                        </button>
                    </div>
                    <div className="my-auto">
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"
                            onClick={() => {
                                onBtn(count + 1, 0, count < images.length - 1)
                                getImages(`http://localhost:3900/api/images/get`)
                            }}
                        >


                            <span className="carousel-control-next-icon p-3 " aria-hidden="true"></span>

                        </button>
                        <br />

                        {user && user.admin && (

                            <ImageForm></ImageForm>
                        )}

                    </div>
                </div>
            </div >
        )
    }

    else return null
}

export default Slider

