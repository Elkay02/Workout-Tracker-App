import React from 'react';
import '../App.css';
import carousel1Img1 from '../images/carousel-1-img-1.jpg';
import carousel2Img1 from '../images/carousel-2-img-1.jpg';
import carousel3Img1 from '../images/carousel-3-img-1.jpg';

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

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const Home = () => {
  return (
    <div className="welcome-message">
      <h1>Welcome to Workout Hub</h1>
      <p>Your personal guide to fitness and workouts.</p>
      <div className="image-grid-container">
        {carouselsData.map((item) => (
          <div key={item.id} className="individual-image-container">
            <img
              className="d-block w-100"
              src={item.imgSrc}
              alt={`Image ${item.id}`}
            />
            <div className="image-caption">
              <h3>{item.captionTitle}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="quote-container">
        <p>"{getRandomQuote()}"</p>
      </div>
    </div>
  );
};

export default Home;