import React from 'react';
import './App.css';
import Intro from "./components/Intro/Intro";
import About from './components/About/About'
import Portfolio from './components/Portfolio/Portfolio'
import Footer from "./components/Footer/Footer"

function App() {
  return (
    <div className="App">
      <Intro />
      <About />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default App;
