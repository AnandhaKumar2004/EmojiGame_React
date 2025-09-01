import './index.css'
import {Component} from 'react'
import NavBar from '../NavBar/index'
import EmojiCard from '../EmojiCard/index'
import WinOrLoseCard from '../WinOrLoseCard/index'

class EmojiGame extends Component {
  state = {
    clickedEmojis: [],
    isGameEnd: false,
    topScore: 0,
    gameResult: {isWon: false, score: 0},
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props
    return [...emojisList].sort(() => Math.random() - 0.5)
  }

  onClickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojis} = this.state
    const hasClickedBefore = clickedEmojis.includes(id)

    if (hasClickedBefore) {
      this.finishGame(clickedEmojis.length, false)
    } else {
      const updatedClickedEmojis = [...clickedEmojis, id]

      if (updatedClickedEmojis.length === emojisList.length) {
        this.finishGame(emojisList.length, true)
      } else {
        this.setState({clickedEmojis: updatedClickedEmojis})
      }
    }
  }

  finishGame = (score, isWon) => {
    this.setState(prevState => ({
      isGameEnd: true,
      topScore: Math.max(prevState.topScore, score),
      gameResult: {isWon, score},
    }))
  }

  restartGame = () => {
    this.setState({
      clickedEmojis: [],
      isGameEnd: false,
      gameResult: {isWon: false, score: 0},
    })
  }

  renderWinOrLose = () => {
    const {gameResult} = this.state
    return (
      <WinOrLoseCard
        isWon={gameResult.isWon}
        onClickPlayAgain={this.restartGame}
        score={gameResult.score}
      />
    )
  }

  renderEmojiList = () => {
    const shuffledEmojiList = this.getShuffledEmojisList()
    return (
      <ul className="emoji-list">
        {shuffledEmojiList.map(emoji => (
          <li key={emoji.id} className="emoji-item">
            <button
              type="button"
              className="emoji-button"
              onClick={() => this.onClickEmoji(emoji.id)}
            >
              <img
                src={emoji.emojiUrl}
                alt={emoji.emojiName}
                className="emoji-image"
              />
            </button>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {isGameEnd, clickedEmojis, topScore} = this.state

    return (
      <div className="app-container">
        <NavBar
          currentScore={clickedEmojis.length}
          topScore={topScore}
          isGameEnd={isGameEnd}
        />
        <main className="emoji-body-container">
          {isGameEnd ? this.renderWinOrLose() : this.renderEmojiList()}
        </main>
      </div>
    )
  }
}

export default EmojiGame
