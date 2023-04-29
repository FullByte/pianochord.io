import { h, Component } from 'preact'
import ChordThumbnail from './ChordThumbnail'
import { KeyName, keySimpleList } from '../libs/key'
import { urlEncodeKey, urlEncodeChord, chordFilterByKeyword } from '../libs/helper'
import { chords } from '../libs/db'

type ChordSelectorProps = {
  selectedKey: KeyName
}

type ChordSelectorState = {
  search: string
}

export default class ChordSelector extends Component<ChordSelectorProps, ChordSelectorState> {
  constructor(props: ChordSelectorProps) {
    super(props)
    this.state = { search: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(event: KeyboardEvent) {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ search: event.target.value })
    }
  }

  handleClick() {
    window.scrollTo(0, 0)
  }

  render() {
    let selectedKey = this.props.selectedKey
    let chordDataList = chords[selectedKey]

    return (
      <div className='chordSelector-container'>
        <input type='text' placeholder='Search by keywords' value={this.state.search} onKeyUp={this.handleChange}
          className={'color-' + (keySimpleList.indexOf(selectedKey) + 1)} />
        <div className='chord-container'>
          {chordDataList.filter(chordFilterByKeyword(this.state.search)).map(c => (
            <a className='chord' onClick={this.handleClick} draggable={false}
              href={'/chord/' + urlEncodeKey(selectedKey) + '/' + urlEncodeChord(c.name)}>
              <ChordThumbnail chord={c} highlightColor={keySimpleList.indexOf(selectedKey) + 1} />
              <div className='name'>{c.name}</div>
            </a>
          ))}
        </div>
      </div>
    )
  }
}
