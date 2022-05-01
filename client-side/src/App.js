import React, { Component, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Navbar from './components/navbar';
import Signin from './components/signin';
import Signup from './components/signup';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from './services/userService';
import Logout from './components/logout';
import About from './components/about';
import CreateCard from './components/createCard';
import ProtectedRoute from './components/common/protectedRoute';
import MyCards from './components/myCard';
import Members from './components/getUsers';
import updateCard from './components/updateCard';
import CardPage from './components/cardPage';
import MyCatCards from './components/myCardsCat';



function App() {
  const [user, setUser] = useState()

  const setTheUser = (user) => {
    setUser(user)
  }

  useEffect(() => {
    const user = userService.getCurrentUser();
    setTheUser(user)
  }, [])



  

    return (
      <React.Fragment>
        <div dir='rtl'>
          <ToastContainer />
          <header>
            <Navbar className='direction-rtl' user={user} />
          </header>
          <main style={{ minHeight: 500 }} >
            <Switch className="col-12">
              <Route path="/logout" component={Logout} />
              <Route exact path="/" component={Home} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
              <Route path='/about' component={About} />
              <Route exact path="/my-cards" component={MyCards} />
              <Route path="/my-cards/category/:id" component={MyCatCards} />
              <Route path="/my-cards/card-page/:id" component={CardPage} />
              <ProtectedRoute path='/my-cards/edit' component={updateCard} admin={true} />
              <ProtectedRoute path='/my-cards/update/:id' component={updateCard} admin={true} />
              <ProtectedRoute path="/create-card" component={CreateCard} admin={true} />
              <ProtectedRoute path="/get-users" component={Members} admin={true} />

            </Switch>
          </main>
        </div>
      </React.Fragment>
    );
    }
export default App;
