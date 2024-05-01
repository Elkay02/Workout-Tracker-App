import React, { useEffect, useState } from 'react';
import '../App.css';
import carousel1Img1 from '../images/carousel-1-img-1.jpg';
import carousel2Img1 from '../images/carousel-2-img-1.jpg';
import carousel3Img1 from '../images/carousel-3-img-1.jpg';
import { motion } from "framer-motion";

interface CarouselData {
  id: number;
  imgSrc: string;
  captionTitle: string;
}

const carouselsData: CarouselData[] = [
  {
    id: 1,
    imgSrc: carousel1Img1,
    captionTitle: 'Elevate Your Fitness Game',
  },
  {
    id: 2,
    imgSrc: carousel2Img1,
    captionTitle: 'Set Your Goals',
  },
  {
    id: 3,
    imgSrc: carousel3Img1,
    captionTitle: 'Join Our Community',
  }
];

const quotes = [
  "'Take care of your body. It's the only place you have to live.' - Jim Rohn",
  "'If you don't find the time, if you don't do the work, you don't get the results.' - Arnold Schwarzenegger",
  "'The hardest lift of all is lifting your butt off the couch.' - Arnold Schwarzenegger",
  "'Once you are exercising regularly, the hardest thing is to stop it.' - Erin Gray",
  "'You miss one hundred percent of the shots you don't take.' - Wayne Gretzky"
];

const getRandomQuoteChars = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return {
    chars: quotes[randomIndex].split(''),
    key: Math.random()
  };
};


const Home = () => {

  const [quoteData, setQuoteData] = useState(getRandomQuoteChars());

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteData(getRandomQuoteChars());
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="welcome-message">
      <motion.h1
        initial={{ opacity: 0, translateY: -15 }} 
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: .5 }}
      >Welcome to Workout Hub</motion.h1>
      <h4>Your personal guide to fitness and workouts.</h4>
      <div className="image-grid-container">
        {carouselsData.map((item) => (
          <motion.div 
            key={item.id} 
            className="individual-image-container" 
            initial={{ opacity: 0, translateX: -50 }} 
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1.5, staggerChildren: 0.25 }}
            >
            <motion.img
              className="d-block w-100"
              src={item.imgSrc}
              alt={`Image ${item.id}`}
              initial={{ opacity: 0, translateX: -50 }} 
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 1.5, staggerChildren: 0.25 }}
            />
            <motion.div className="image-caption">
              <motion.h3>{item.captionTitle}</motion.h3>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="quote-container">
      {quoteData.chars.map((char, index) => (
          <motion.span
            key={`${quoteData.key}-${index}`} // Include the unique key in the key prop
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 120 }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default Home;