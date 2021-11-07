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
  const [arrowsNumbers, setArrowsNumbers] = React.useState([]);
  const [turn, setTurn] = React.useState(-1);

  const damage = 5;

  function movement(e) {
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

    setTop(top - damage);
    setTurn(0);
    player.style.top = top - damage + 'px';
    player.style.transform = 'rotate(270deg)';
  }

  function moveDown(e) {
    e.preventDefault();

    setTop(top + damage);
    setTurn(2);
    player.style.top = top + damage + 'px';
    player.style.transform = 'rotate(90deg)';
  }

  function moveLeft(e) {
    e.preventDefault();

    setLeft(left - damage);
    setTurn(3);
    player.style.left = left - damage + 'px';
    player.style.transform = 'rotate(180deg)';
  }

  function moveRight(e) {
    e.preventDefault();

    setLeft(left + damage);
    setTurn(1);
    player.style.left = left + damage + 'px';
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
        return (<span className="arrow">↑</span>);

      case 1:
        return (<span className="arrow">→</span>);

      case 2:
        return (<span className="arrow">↓</span>);

      case 3:
        return (<span className="arrow">←</span>);

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
  }, [playerHP, player])

  React.useEffect(() => {
    if (enemyHP === 0) {
      setIsGameOver(true);
      player.style.background = 'lime';
    }
  }, [enemyHP, player])

  React.useEffect(() => {
    const arrows = [];
    for (let i = 0; i < 9; i++) {
      const arrowNumber = generateArrow();
      arrows.push(arrowNumber);
    }
    setArrowsNumbers(arrows);
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (turn === -1) return;
    if (turn === arrowsNumbers[4]) {
      damageEnemy();
    } else {
      damagePlayer();
    }
    const arrowNumber = generateArrow();
    const newArrowsNumber = arrowsNumbers.filter((n, i) => i !== 0);
    setArrowsNumbers([...newArrowsNumber, arrowNumber]);
    setTurn(-1);
    // eslint-disable-next-line
  }, [arrowsNumbers, turn]);

  return (
    <div className="app" tabIndex="0" onKeyDown={isGameOver ? null : movement}>
      <div className="game">
        <div className="arrows">
          <p className="arrows__container">
            {
              arrowsNumbers.map((arrowNumber) => renderArrow(arrowNumber))
            }
          </p>
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
      <button className="game__move-button game__move-button_to_up" onClick={isGameOver ? null : moveUp}>↑</button>
      <button className="game__move-button game__move-button_to_right" onClick={isGameOver ? null : moveRight}>→</button>
      <button className="game__move-button game__move-button_to_down" onClick={isGameOver ? null : moveDown}>↓</button>
      <button className="game__move-button game__move-button_to_left" onClick={isGameOver ? null : moveLeft}>←</button>
    </div>
  );
}

export default App;
