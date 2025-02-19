import React, { useState } from 'react'
import GoBackButton from '../components/GoBackButton'

const Assignment2 = () => {
  const [playerCount, setPlayerCount] = useState(0)
  const [cardCount, setCardCount] = useState(0)
  const [players, setPlayers] = useState<any[]>([])
  const [winner, setWinner] = useState<string | null>(null)
  const [cardLists, setCardLists] = useState<any[]>([])

  const handlePlayerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(Number(e.target.value))
  }

  const handleCardCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardCount(Number(e.target.value))
  }

  const handleGameStart = () => {
    let tempPlayers: any[] = []
    for (let i = 0; i < playerCount; i++) {
      tempPlayers.push({
        name: `Player ${i + 1}`,
        cards: [],
        score: 0,
      })
    }

    // Generate cards and assign them to players
    let allCards: number[] = []
    for (let i = 0; i < cardCount; i++) {
      allCards.push(Math.floor(Math.random() * 20) + 1) // Cards between 1 and 20
    }

    let currentPlayer = 0
    allCards.forEach((card) => {
      tempPlayers[currentPlayer].cards.push(card)
      tempPlayers[currentPlayer].score += card
      currentPlayer = (currentPlayer + 1) % playerCount
    })

    // Sort players by score (descending), then by player number (ascending) for ties
    tempPlayers.sort((a, b) => {
      if (b.score === a.score) {
        return a.name.localeCompare(b.name)
      }
      return b.score - a.score
    })

    setPlayers(tempPlayers)
    setCardLists(allCards)
    setWinner(tempPlayers[0].name)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>카드 게임</h2>
        <p>플레이어 수와 카드 수를 입력 후 게임을 시작하세요.</p>
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>플레이어 수:</label>
        <input
          type='number'
          value={playerCount}
          onChange={handlePlayerCountChange}
          min='2'
          style={styles.input}
        />
        <label style={styles.label}>카드 수:</label>
        <input
          type='number'
          value={cardCount}
          onChange={handleCardCountChange}
          min='1'
          style={styles.input}
        />
      </div>
      <button onClick={handleGameStart} style={styles.button}>
        게임 시작
      </button>

      {winner && (
        <div style={styles.result}>
          <h3>게임 결과</h3>
          <p>
            <strong>승자:</strong> {winner}
          </p>
          <p>
            <strong>점수:</strong> {players[0]?.score}
          </p>
          <p>
            <strong>보유카드:</strong> {players[0]?.cards.join(', ')}
          </p>
        </div>
      )}

      {players.length > 0 && (
        <div style={styles.players}>
          <h3>전체 플레이어:</h3>
          {players.map((player, index) => (
            <div key={index} style={styles.player}>
              <p>
                <strong>{player.name}</strong>
              </p>
              <p>점수: {player.score}</p>
              <p>카드: {player.cards.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
      <GoBackButton />
    </div>
  )
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center' as 'center' | 'left' | 'right' | 'justify',
    marginTop: '50px',
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    marginRight: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '60px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  result: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#d4edda',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  players: {
    marginTop: '20px',
  },
  player: {
    padding: '10px',
    backgroundColor: '#e2e3e5',
    margin: '5px 0',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
}

export default Assignment2
