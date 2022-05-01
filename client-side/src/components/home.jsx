import React, { useState } from 'react';
import { useEffect } from 'react';
import { getCurrentUser } from '../services/userService';
import Slider from './common/slider';

function Home(){ 
const [user, setUser] = useState();

const set = () => {
setUser(getCurrentUser);
}
    useEffect(() => {
    set();
    },[user])
    console.log(user);
        return(
            <div className="container col-12">
                <div className="row col-12">
                    <Slider />
                    
                </div>
            </div>
        )
    }


export default Home;