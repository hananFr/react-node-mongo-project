
import React, { useEffect, useState } from "react";
import User from "./user";
import PageHeader from "./common/pageHeader";
import Axios from "axios";



function Members() {
    const [users, setUsers] = useState()

    const setTheUsers = async () => {
        const data = await Axios.get('http://localhost:3900/api/users/get');
        setUsers(data.data);
    }
    useEffect(() => {
        setTheUsers();
    }, [])

    if (users) {
        return (
            <div className="container">
                <PageHeader titleText="משתמשים" />
                <div className="row">
                    <table className="table caption-top table-striped table-light">
                        <thead>

                            <tr>
                                <th scope="col">שם</th>
                                <th scope="col">אימייל</th>
                                <th scope="col">תאריך הצטרפות</th>
                                <th scope="col">מנהל</th>
                                <th scope="col">הגדרת ניהול</th>
                            </tr>
                        </thead>
                        <tbody className="text-warning">
                            {users.length > 0 &&
                                users.map(user => < User user={user} key={user.id} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    else return (
        <div className="container">
            <PageHeader titleText="משתמשים" />
        </div>

    )
}


export default Members;