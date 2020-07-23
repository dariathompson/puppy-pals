import React, { useState } from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import './App.css';
import Dog from './components/Dog';
import Lonely from './components/Lonely';
import data from './data.json'

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";


const App = () => {
  const [dogs, setDogs] = useState(data);
  const [likedDogs, setLikedDogs] = useState([]);
  const [superlikedDogs, setSuperlikedDogs] = useState([]);
  const [dislikedDogs, setDislikedDogs] = useState([]);
  const activeDog = 0;

  // switch(action) {
  //   case 'ADD_TO_LIKED_DOG':
  //     break;
  //   case 'ADD_TO_DISLIKED_DOG':
  //     break;
  //   case 'ADD_TO_SUPERLIKED_DOG':

  //   default:
  //     return dogs;
  // }

  return(
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
