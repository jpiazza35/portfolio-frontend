import React, { useEffect, useState, useRef } from "react";
import { useIntersection } from "react-use";
import "./Portfolio.css";
import axios from "axios";
import { gsap } from "gsap";
import PortfolioCard from "./PortfolioCard";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get("https://jp-portfolio-backend.herokuapp.com/portfolio")
      .then((res) => {
        setProjects(res.data);
      });
  }, [setProjects]);

  const polygon = useRef(null);
  const textbox = useRef(null);
  const [wasAnimated, setWasAnimated] = useState(false);
  const polygonIntersection = useIntersection(polygon,{
    root: null,
    rootMargin: '0px',
    threshold: 0.01
  });

  function randomTimeSlide() {
    var result = 1000 + Math.floor((4000 - 1000) * Math.random());
    return result
  }
  function animate () {
    if (!wasAnimated) {
      gsap.fromTo(polygon.current, {duration:1}, { scaleX: 0 }, { scaleX: 1 });
      gsap.fromTo(
        textbox.current,
      {duration:1},
        { yPercent: 40, opacity: 1 },
        { delay: 1.3, yPercent: -50, opacity: 1 }
      );
      setWasAnimated(true);
    }
  };
  
  if(polygonIntersection && polygonIntersection.isIntersecting){
    animate();
  }

  return (
    <>
      <div className="portfolio">
        <div className="portfolio-intro">
          <div ref={polygon} className="portfolio-intro-polygon">
            <div ref={textbox} className="portfolio-intro-textbox">
              <h1 className="portfolio-title main-heading">Projects & Certifications</h1>
              <p className="portfolio-description sub-heading">
                Here, I will put all my projects from Git as well as my current done courses.
              </p>
            </div>
          </div>
        </div>
        <div className="portfolio-container">
          <div className="portfolio-cards">
           {projects &&
              projects.map((project, index) => (
                <PortfolioCard id={index} project={project} timeSlide={randomTimeSlide()}/>
            ))} 
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
