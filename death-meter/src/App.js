import React, {useRef, useReducer } from "react";
import * as ReactDOM from 'react-dom';
import { gsap } from "gsap";
import './App.css';

const App = () => {

  const [state, dispatch] = useReducer((state, action) => {
    return {...state, ...action};
  } , {
    emojiList: ["☠️","⚔️","💀","⚰️","🔪","🗡️"],
    emojiArray: [],
    counter: 0
  });

  const containerSlot = useRef(null);

  const emojiAnimation = async () => {

    if(isTweening()) return;

    await createEmojiElement(50);
    emojiExplosion();
    counterAnimation();
  }

  const emojiExplosion = () => {
    const TLCONF = gsap.timeline();
    TLCONF
    .to('.emoji', {
      x: "random(-150, 150)",
      y: "random(-150, 150)",
      z: "random(0, 1000)",
      rotation: "random(-180, 180)",
      duration: 1
    }).to('.emoji', {
      autoAlpha: 0, 
      duration: 0.3},
      "-=0.2"
    ).add(() => {
      ReactDOM.render('', containerSlot.current);
    });
  }

  const isTweening = () => {
    return gsap.isTweening(".emoji");
  }

  const createEmojiElement = (number = 10) => {
    dispatch({emojiArray: []});
    for(let i = 0; i < number; i++) {
      state.emojiArray.push(
        React.createElement(
          'div',
          {key: i, className: 'emoji'},
          state.emojiList[Math.floor(Math.random() * state.emojiList.length)]
        )
      );
    }
    ReactDOM.render(state.emojiArray, containerSlot.current);
  }

  const counterAnimation = () => {
    const TLCOUNT = gsap.timeline();
    TLCOUNT
    .to('.counter', {
      x: "20",
      autoAlpha: 0,
      duration: .15
    }).to('.counter', {
      x: "-20",
      autoAlpha: 0,
      duration: .05
    }).add(() => {
      incrementDeath();
    }).to('.counter', {
      x: "0",
      autoAlpha: 1,
      duration: .15
    });
  }

  const incrementDeath = () => {
    dispatch({counter: state.counter + 1});
  }

  return(
    <div className="App">
      <div className='app-container'>
        <header className="App-header">
          <img src='./twitch-logo.svg' className="App-logo" alt="logo" />
          <p>Death Meter</p>
        </header>
        <main>
          <article>
            <span className="skull">☠️</span>
            <h2 className="counter">{state.counter}</h2>
            <p>Morts sur KH III</p>
          </article>
          <div className='number'>
            <button onClick={emojiAnimation}>⚔️</button>
            <div className="slot" ref={containerSlot}></div>
          </div>
        </main>
        <p className="signature">
          <img src="./twitch-min-logo.svg" alt="React"/>
          +
          <img className="react-logo" src="./react-logo.svg" alt="React"/>
        </p>
      </div>
    </div>
  );
}

export default App;
