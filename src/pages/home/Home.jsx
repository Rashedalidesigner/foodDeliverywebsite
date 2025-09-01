import React from 'react';
import "./home.css";
import Header from '../../components/Header/Header';
import Explormenu from '../../components/explormenu/Explormenu';
import { useState } from 'react';
import FoodDisplay from '../../components/foodDisplay/FoodDisplay';
import AppDownload from '../../components/Add Dowmload/AppDownload';

const Home = () => {
    const [category, setCategory] = useState("All");
  return (
    <div>
      <Header/>
      <Explormenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
