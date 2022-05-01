import React, { useState } from "react";
const axios = require('axios');
function User(props) {

    const [makeAdmin] = useState({ admin: true});
    const [admin] = useState({ admin: false});

    const onHandleBtn = (e) => {
        const user = props.user;

        console.log(user);
        if (user.admin) {
            axios.put(`http://localhost:3900/api/users/admin/${user.id}`, admin).then(window.location.reload())

        }

        if (!user.admin) {
            axios.put(`http://localhost:3900/api/users/admin/${user.id}`, makeAdmin).then(
                window.location.reload())
        }        
    }

    const {user} = props.user;
    if (!user.admin) {


        return (
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.createdAt}</td>
                <td>{user.admin}</td>
                <td><input type="button" className="btn btn-primary" onClick={onHandleBtn} value='הגדר כמנהל' /></td>
            </tr>
        );
    }
    else {
        return (<tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.createdAt}</td>
            <td>{user.admin}</td>
            <td><input type="button" className="btn btn-secondary" onClick={onHandleBtn} value='הסר מניהול' /></td>
        </tr>
        );
    }
}


export default User;