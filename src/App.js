import './App.css';
import React from 'react';
import { startPosition } from './config';

function App() {
  const [player, setPlayer] = React.useState(null);
  const [top, setTop] = React.useState(startPosition.top);
  const [left, setLeft] = React.useState(startPosition.left);
  const [isGameOver, setIsGameOver] = React.useState(false);

  // HP
  const [playerHPBar, setplayerHPBar] = React.useState(null);
  const [playerHP, setPlayerHP] = React.useState(100);
  const [enemyHPBar, setEnemyHPBar] = React.useState(null);
  const [enemyHP, setEnemyHP] = React.useState(100);

  // Arrows
  const [arrow, setArrow] = React.useState(0);
  const [arrowNumber, setArrowNumber] = React.useState(0);
  const [turn, setTurn] = React.useState(-1);

  const step = 10;

  function movement(e) {
    console.log(e.keyCode, e.key);
    switch (e.keyCode) {
      case 87:
        moveUp(e);
        break;

      case 65:
        moveLeft(e);
        break;

      case 83:
        moveDown(e);
        break;

      case 68:
        moveRight(e);
        break;

      case 32:
        damagePlayer(e);
        break;

      default:
        break;
    }
  }

  function moveUp(e) {
    e.preventDefault();

    setTop(top - step);
    setTurn(0);
    player.style.top = top - step + 'px';
    player.style.transform = 'rotate(270deg)';
  }

  function moveDown(e) {
    e.preventDefault();

    setTop(top + step);
    setTurn(2);
    player.style.top = top + step + 'px';
    player.style.transform = 'rotate(90deg)';
  }

  function moveLeft(e) {
    e.preventDefault();

    setLeft(left - step);
    setTurn(3);
    player.style.left = left - step + 'px';
    player.style.transform = 'rotate(180deg)';
  }

  function moveRight(e) {
    e.preventDefault();

    setLeft(left + step);
    setTurn(1);
    player.style.left = left + step + 'px';
    if (player.style.transform === 'rotate(270deg)') player.style.transform = 'rotate(360deg)';
    else player.style.transform = 'rotate(0deg)';
  }

  function damagePlayer() {
    setPlayerHP(playerHP - 5);
    playerHPBar.style.width = playerHP - 5 + '%';
  }

  function damageEnemy() {
    setEnemyHP(enemyHP - 5);
    enemyHPBar.style.width = enemyHP - 5 + '%';
  }

  function generateArrow() {
    return Math.floor(Math.random() * 4);
  }

  function renderArrow(arrowNumber) {
    switch (arrowNumber) {
      case 0:
        return '↑';

      case 1:
        return '→';

      case 2:
        return '↓';

      case 3:
        return '←';

      default:
        break;
    }
  }

  React.useEffect(() => {
    setPlayer(document.querySelector('.player'));
    setplayerHPBar(document.querySelector('.health-bar_player'));
    setEnemyHPBar(document.querySelector('.health-bar_enemy'));
  }, []);

  React.useEffect(() => {
    if (playerHP === 0) {
      setIsGameOver(true);
      player.style.background = 'red';
    }
  }, [playerHP])

  React.useEffect(() => {
    if (enemyHP === 0) {
      setIsGameOver(true);
      player.style.background = 'lime';
    }
  }, [enemyHP])

  React.useEffect(() => {
    const arrowNumber = generateArrow();
    setArrowNumber(arrowNumber);
    setArrow(renderArrow(arrowNumber));
  }, [])

  React.useEffect(() => {
    console.log(arrowNumber, turn);
    if (turn === -1) return;
    if (turn === arrowNumber) {
      const arrowNumber = generateArrow();
      setArrowNumber(arrowNumber);
      setArrow(renderArrow(arrowNumber));
      damageEnemy();
    } else {
      damagePlayer();
    }
    setTurn(-1);
  }, [arrowNumber, turn])

  return (
    <div className="app" tabIndex="0" onKeyDown={isGameOver ? null : movement}>
      <div className="game">
        <div className="arrows">
          <p>{arrow}</p>
        </div>
        <div className="health-bar health-bar_enemy"></div>
        <div className="player">
          <div>
            <div className="eyes">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
            <div className="nose"></div>
          </div>
          <div className="hair"></div>
        </div>
        <div className="health-bar health-bar_player" style={{ width: '100%' }}></div>
      </div>
      <button className="game__move-button game__move-button_to_up" onClick={moveUp}>↑</button>
      <button className="game__move-button game__move-button_to_right" onClick={moveRight}>→</button>
      <button className="game__move-button game__move-button_to_down" onClick={moveDown}>↓</button>
      <button className="game__move-button game__move-button_to_left" onClick={moveLeft}>←</button>
    </div>
  );
}

export default App;
