import React, { useState, useEffect } from 'react';
import { Route, Routes} from "react-router-dom";
import {Register, Login, Profile, Store} from "./"
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../databaseAdapter';
import '../style/App.css';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <div className="app-container">
    <Routes>
    <Route exact path = "/Register" element={<Register />}></Route>
    <Route exact path = "/Login" element={<Login />}></Route>
    <Route exact path = "/Profile" element={<Profile />}></Route>
    <Route exact path = "/Store" element={<Store allProducts = {allProducts} setAllProducts = {setAllProducts} />}></Route>


    </Routes>
      {/* <h1>Hello Jessica, Preston, Ruby & Simu!</h1>
      <p>API Status: {APIHealth}</p> */}
    </div>
  );
};

export default App;
