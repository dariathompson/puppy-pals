import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Dog from './components/Dog';
import Lonely from './components/Lonely';
import data from './data.json'

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
    <div className="app">
      <Header />

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
  );
};

export default App;
