import {Component} from 'react'

import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'

import './index.css'

class EmojiGame extends Component {
  state = {
    clickedEmojiList: [],
    isGameOngoing: true,
    topScore: 0,
  }

  resetGame = () => {
    this.setState({clickedEmojiList: [], isGameOngoing: true})
  }

  renderScoreCard = () => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state
    const isWon = clickedEmojiList.length === emojisList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        score={clickedEmojiList.length}
        onClickPlayAgain={this.resetGame}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state

    this.setState({
      topScore: Math.max(topScore, currentScore),
      isGameOngoing: false,
    })
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state

    if (clickedEmojiList.includes(id)) {
      this.finishGameAndSetTopScore(clickedEmojiList.length)
    } else {
      if (clickedEmojiList.length === emojisList.length - 1) {
        this.finishGameAndSetTopScore(emojisList.length)
      }

      this.setState(prevState => ({
        clickedEmojiList: [...prevState.clickedEmojiList, id],
      }))
    }
  }

  getShuffledEmojisList = lst => lst.sort(() => Math.random() - 0.5)

  renderEmojisList = () => {
    const {emojisList} = this.props
    const shuffledEmojisList = this.getShuffledEmojisList(emojisList)

    return (
      <ul className="emojis-list-container">
        {shuffledEmojisList.map(eachEmojiItem => (
          <EmojiCard
            key={eachEmojiItem.id}
            emojiDetails={eachEmojiItem}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickedEmojiList, topScore, isGameOngoing} = this.state

    return (
      <div className="main-container">
        <NavBar
          topScore={topScore}
          isGameOngoing={isGameOngoing}
          currentScore={clickedEmojiList.length}
        />
        <div className="emoji-body-container">
          {isGameOngoing ? this.renderEmojisList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
