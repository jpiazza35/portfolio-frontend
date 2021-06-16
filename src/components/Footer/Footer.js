import React, { useRef, useState } from 'react';
import './Footer.css'
import { useIntersection } from "react-use";
import { TweenMax } from "gsap";
import { FaGithub, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
    const polygon = useRef(null);
    const polygonText = useRef(null);
    const textbox = useRef(null);
    const [wasAnimated, setWasAnimated] = useState(false);
    const polygonIntersection = useIntersection(polygon,{
        root: null,
        rootMargin: '0px',
        threshold: 0.01
    });

    function animate() {
        if(!wasAnimated) {
            TweenMax.fromTo(polygon.current, 1, { scaleX: 0 }, { scaleX: 1 });
            TweenMax.fromTo(polygonText.current, 1.5, { delay: 1, scaleX: 0 }, { scaleX: 1 });
            TweenMax.fromTo(
                textbox.current,
                1,
                { yPercent: 40, opacity: 0 },
                { delay: 1.5, yPercent: 0, opacity: 1 }
              );
              setWasAnimated(true);
        }
    }

    if(polygonIntersection && polygonIntersection.isIntersecting) animate();

    return (
        <div className="footer">
            <div ref={polygon} className="footer-polygon"></div>
                <div ref={polygonText} className="footer-polygon">
                    <div ref={textbox} className="footer-textbox">
                        <p className="footer-autor">© 2021 Jose Ignacio Piazza</p>
                        <div className="footer-icon-zone">
                            <a href="https://github.com/jpiazza35">
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/joseipiazza/">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Footer;
