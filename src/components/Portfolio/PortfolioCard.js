import React, { useRef, useState } from "react";
import { useIntersection } from "react-use";
import "./PortfolioCard.css";
import { gsap } from "gsap";
import { Fade } from "react-slideshow-image";
import { FaGithub, FaLink } from 'react-icons/fa';

const PortfolioCard = ({ project, timeSlide }) => {
  const fadeProperties = {
    duration: timeSlide,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
  };

  const card = useRef(null);
  const [wasAnimated, setWasAnimated] = useState(false);
  const cardIntersection = useIntersection(card, {
    root: null,
    rootMargin: "0px",
    threshold: 0.01,
  });

  function animate() {
    if(!wasAnimated){
      gsap.fromTo(
        card.current,
        {duration:1},
        { yPercent: 40, opacity: 1 },
        { yPercent: 10, opacity: 1 }
        //{ yPercent: 0, opacity: 1 }
        );
        setWasAnimated(true);
    }
  }

  if (cardIntersection && cardIntersection.isIntersecting) animate();


  return (
    <div ref={card} className="portfolio-card">
      <div className="carousel-container">
        <Fade {...fadeProperties}>
          {project.images.map((image, index) => (
            <div className="each-fade">
              <img className="carousel-image" alt={index} src={image} />
            </div>
          ))}
        </Fade>
      </div>
      <div className="portfolio-card-textbox">
        <div className="card-pills">
          {project.tecnologies.map((pill, index) =>
            <p className="card-pill">{pill}</p>
          )}
        </div>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        <div className="portfolio-button-zone">
        <a href={project.link}>
            <button className="portfolio-card-button"><FaLink /> Demo</button>
          </a>
          <a href={project.repo}>
            <button className="portfolio-card-button"><FaGithub /> Repo</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
