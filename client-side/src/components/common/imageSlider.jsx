import React, { useState } from 'react'
import { useEffect } from 'react';

const SliderImage = ({ pic, image }) => {
    const [active, setActive] = useState()

    const itemActive = () => {
        if (pic === image) {
            setActive('carousel-item-active')
        }
        else {
            setActive('carousel-item')
        }
    }


    useEffect(() => {
        itemActive()
    }, [pic])
    return (<React.Fragment>
        <div className={`${active} mx-auto`}>
            <img className="img-fluid mb-5 mx-auto w-100" id='img' src={`http://localhost:3900/api/images/${image._id}`}
                alt="travel_pic" />
        </div>
    </React.Fragment>
    )
}
export default SliderImage;