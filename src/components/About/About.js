import React, { useState, useEffect, useRef } from "react";
import { useIntersection } from 'react-use'
import axios from "axios";
import "./About.css";
import photo from "../../assets/img/avatar.png";
import { TweenMax } from "gsap";
import { Link } from 'react-scroll';

const About = () => {
  const [information, setInformation] = useState({});
  const [polygonWasAnimated, setPolygonWasAnimated] = useState(false)
  const [descriptionWasAnimated, setDescriptionWasAnimated] = useState(false);
  const polygon = useRef(null);
  const title = useRef(null);
  const description = useRef(null);
  const pills = useRef(null);
  const buttons = useRef(null)

  useEffect(() => {
    axios
      .get("https://jp-portfolio-backend.herokuapp.com/about")
      .then((res) => {
        setInformation(res.data[0]);
      });
  }, [setInformation]);

  const polygonIntersection = useIntersection(polygon,{
    root: null,
    rootMargin: '0px',
    threshold: 0.01
  });

  const descriptionIntersection = useIntersection(title, {
    root: null,
    rootMargin: '0px',
    threshold: 0.01
  });

  const animatePolygon = () => {
    if(!polygonWasAnimated){
      TweenMax.fromTo(polygon.current, 2, { scaleX: 0 }, { scaleX: 1 });
      setPolygonWasAnimated(true)
    }
  };
  const animateDesctiption = () => {
    if(!descriptionWasAnimated){
      TweenMax.fromTo(title.current, 1, { xPercent: 40, opacity: 0 }, {delay: 0 ,xPercent: 0, opacity: 1 });
      TweenMax.fromTo(description.current, 1, { xPercent: 40, opacity: 0 }, {delay: 0.5 ,xPercent: 0, opacity: 1 });
      TweenMax.fromTo(pills.current, 1, { xPercent: 40, opacity: 0 }, {delay: 1 ,xPercent: 0, opacity: 1 });
      TweenMax.fromTo(buttons.current, 1, { xPercent: 40, opacity: 0 }, {delay: 1.5 ,xPercent: 0, opacity: 1 });
      setDescriptionWasAnimated(true);
    }
  }

  if(polygonIntersection && polygonIntersection.isIntersecting ){
    animatePolygon();
  }

  if(descriptionIntersection && descriptionIntersection.isIntersecting){
    animateDesctiption();
  }

  return (
    <div className="about">
      <div ref={polygon} className="about-polygon"></div>
      <div className="about-container">
        <div className="container-photo">
          <img  className="about-profile-photo" alt="profile" src={photo} />
        </div>
        <div className="description">
          <h1 ref={title} className="about-title main-heading">About me</h1>
          <p ref={description} className="about-content">
            I am {information.name}. {information.about_me}
          </p>
          <div ref={pills} className="about-pill-zone">
            <p className="about-content">
              Below some of the technologies that i use:
            </p>
            <ul>
              {information.skills &&
                information.skills.map((skill, index) => (
                  <p className="about-pills">{skill}</p>
                ))}
            </ul>
          </div>
          <div ref={buttons} className="about-buttons">
          <Link to="portfolio" duration={1000} offset={0} spy={true} smooth={true} isDynamic={true}>
            <button className="cta-btn danger">My projects</button>
          </Link>
            <a href="/CV.pdf">
              <button className="cta-btn danger">My CV</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
