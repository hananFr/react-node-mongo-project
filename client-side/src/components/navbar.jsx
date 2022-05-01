import React from 'react';
import { Link, NavLink } from 'react-router-dom';


function Navbar(props) {



    const { user } = props;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="nav">
                <li className="nav-item logo align-items-start pl-4 mt-0">
                    <NavLink className="nav-link active" to='/'><img src="logo.jpg" alt="logo_pic" height="90" className="p-0 m-0" /></NavLink>
                </li>
                <li className="nav-item align-items-end d-flex">

                    <div className="dropdown open">
                        <button className="btn btn-muted py-0 text-warning" type="button" id="triggerId" data-toggle="dropdown"
                            aria-expanded="false">
                            טיולים
                        </button>
                        <div className="dropdown-menu justify-content-center text-right">
                            <Link className="dropdown-item text-warning" to={`/my-cards/category/schools`}>בתי ספר</Link>
                            <Link className="dropdown-item text-warning" to={`/my-cards/category/groups`}>קבוצות</Link>
                            <Link className="dropdown-item text-warning" to={`/my-cards/category/couples`}>טיולי זוגות</Link>
                            <Link className="dropdown-item text-warning" to={`/my-cards/category/families`}>משפחות</Link>


                            <NavLink className="dropdown-item text-warning" to="/my-cards">
                                טיולים                                      </NavLink>

                            {user && user.admin && (
                                <NavLink className="dropdown-item text-warning" to="/create-card">
                                    הוספת טיול חדש
                                </NavLink>
                            )}

                            {user && user.admin && (
                                <NavLink className="dropdown-item text-warning" to="/get-users">
                                    משתמשים
                                </NavLink>
                            )}


                        </div>
                    </div>
                </li>
                <li className="nav-item align-items-end d-flex">

                    <NavLink className="nav-link py-0 text-warning" to='/about'>מי אנחנו?</NavLink>

                </li>

            </ul>

            <ul className="nav mr-auto mt-auto ml-5">
                {!user && (
                    <React.Fragment>
                        <li className="nav-item align-items-end d-flex">
                            <NavLink className="nav-link py-0 text-primary" to='/signin'>התחבר</NavLink>
                        </li>
                        <li className="nav-item align-items-end d-flex">
                            <NavLink className="nav-link py-0 text-primary" to="/signup">הירשם</NavLink>
                        </li>
                    </React.Fragment>
                )}
                {user && (
                    <React.Fragment>
                        <li> <NavLink className="nav-link nav-item" to="/logout"> התנתק</NavLink></li>
                    </React.Fragment>
                )}
            </ul>

        </nav>

    )
}


export default Navbar