import React, { useState } from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import './App.css';
import Dog from './components/Dog';
import Lonely from './components/Lonely';
import data from './data.json'

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";


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

    <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          {/* <Route exact path="/register" component={Register} /> */}
          {/* <Route exact path="/login" component={Login} /> */}

      {/* <h1>Doggy Dates</h1> */}
      {/* {dogs[1] ? (
        <Dog
        key={dogs[1].id}
        dog={dogs[1]}
        modifySuperficialChoices={modifySuperficialChoices}
        likedDogs={likedDogs}
        />
        ) : (
          <Lonely
          activeDogImage={dogs[activeDog].image}
          likedDogs={likedDogs}
          superlikedDogs={superlikedDogs}
          />
        )} */}
        </div>
      </Router>
  );
};

export default App;
