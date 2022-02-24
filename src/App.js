import './App.css';
import React from 'react';
import { startPosition } from './config';

function App() {

  const [player, setPlayer] = React.useState(null);
  const [top, setTop] = React.useState(startPosition.top);
  const [left, setLeft] = React.useState(startPosition.left);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [isPlayerMoves, setIsPlayerMoves] = React.useState(false);

  // HP
  const [playerHPBar, setplayerHPBar] = React.useState(null);
  const [playerHP, setPlayerHP] = React.useState(100);
  const [enemyHPBar, setEnemyHPBar] = React.useState(null);
  const [enemyHP, setEnemyHP] = React.useState(100);

  // Arrows
  const [arrowsNumbers, setArrowsNumbers] = React.useState([]);
  const [turn, setTurn] = React.useState(-1);

  const step = 15;
  const damage = 5;

  function movement(e) {
    switch (e.keyCode) {
      case 65:
      case 68:
      case 83:
      case 87:
      case 37:
      case 38:
      case 39:
      case 40:
        return move(e);

      case 32:
        return damagePlayer(e);

      default:
        break;
    }
  }

  function move(e) {
    switch (e.keyCode) {
      case 87:
      case 38:
        moveUp(e);
        break;

      case 65:
      case 37:
        moveLeft(e);
        break;

      case 83:
      case 40:
        moveDown(e);
        break;

      case 68:
      case 39:
        moveRight(e);
        break;

      default:
        break;
    }
    setIsPlayerMoves(true);
    setTimeout(() => setIsPlayerMoves(false), 1000);
  }

  function moveUp(e) {
    e.preventDefault();

    setTop(top - step);
    setTurn(0);
    player.style.top = top - step + 'px';

  }

  function moveDown(e) {
    e.preventDefault();

    setTop(top + step);
    setTurn(2);
    player.style.top = top + step + 'px';

  }

  function moveLeft(e) {
    e.preventDefault();

    setLeft(left - step);
    setTurn(3);
    player.style.left = left - step + 'px';

  }

  function moveRight(e) {
    e.preventDefault();

    setLeft(left + step);
    setTurn(1);
    player.style.left = left + step + 'px';

  }

  function damagePlayer() {
    setPlayerHP(playerHP - damage);
    playerHPBar.style.width = playerHP - damage + '%';
  }

  function damageEnemy() {
    setEnemyHP(enemyHP - damage);
    enemyHPBar.style.width = enemyHP - damage + '%';
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
    setplayerHPBar(document.querySelector('.health-bar_player .health-bar__points'));
    setEnemyHPBar(document.querySelector('.health-bar_enemy .health-bar__points'));
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
              arrowsNumbers.map(renderArrow)
            }
          </p>
        </div>
        <div className="health-bar health-bar_enemy">
          <div className="health-bar__points"></div>
        </div>
        <div className={`player ${isPlayerMoves && "player_moves"}`}>
          <div>
            <div className="eyes">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
            <div className="nose"></div>
          </div>
          <div className="hair"></div>
        </div>
        <div className="health-bar health-bar_player">
          <div className="health-bar__points"></div>
        </div>
      </div>
      <button className="game__move-button game__move-button_to_up" onClick={isGameOver ? null : moveUp}>↑</button>
      <button className="game__move-button game__move-button_to_right" onClick={isGameOver ? null : moveRight}>→</button>
      <button className="game__move-button game__move-button_to_down" onClick={isGameOver ? null : moveDown}>↓</button>
      <button className="game__move-button game__move-button_to_left" onClick={isGameOver ? null : moveLeft}>←</button>
    </div>
  );
}

export default App;
