import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {

  const [character, setCharacter] = React.useState(null);
  const [top, setTop] = React.useState(0);
  const [left, setLeft] = React.useState(0);
  const step = 20;

  function movement(e) {
    switch (e.key.toLowerCase()) {
      case 'w':
        setTop(top - step);
        character.style.top = top - step + 'px';
        character.style.transform = 'rotate(270deg)';
        break;

      case 'a':
        setLeft(left - step);
        character.style.left = left - step + 'px';
        character.style.transform = 'rotate(180deg)';
        break;

      case 's':
        setTop(top + step);
        character.style.top = top + step + 'px';
        character.style.transform = 'rotate(90deg)';
        break;

      case 'd':
        setLeft(left + step);
        character.style.left = left + step + 'px';
        if (character.style.transform === 'rotate(270deg)') character.style.transform = 'rotate(360deg)';
        else character.style.transform = 'rotate(0deg)';
        break;

      default:
        break;
    }
  }

  React.useEffect(() => {
    setCharacter(document.querySelector('.character'));
  }, [])

  return (
    <div className="app" tabIndex="0" onKeyDown={movement}>
      <div className="game">
        <div className="character">
          <div>
            <div className="eyes">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
            <div className="nose"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
