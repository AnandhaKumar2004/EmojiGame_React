import './index.css'
import {Component} from 'react'

class EmojiCard extends Component {
  render() {
    const {emoji, onClickEmoji} = this.props
    const {emojiName, emojiUrl, id} = emoji

    const handleClick = () => {
      onClickEmoji(id)
    }

    return (
      <li className="emoji-item" onClick={handleClick}>
        <img src={emojiUrl} alt={emojiName} className="emoji-image" />
      </li>
    )
  }
}

export default EmojiCard
