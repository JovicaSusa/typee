import React, { createRef } from 'react';
import Character from './Character';
import Word from './Word';

class TypingBoard extends React.Component {
  constructor(props) {
    super(props);

    this.duration = props.location.duration || 60;
    this._started = false;
    this.inputRef = createRef();
    this.state = {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently   with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently   with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
      typedText: "",
      mistypedIndexes: [],
      currentIndex: 0,
      countdownValue: this.duration,
      wordsPerMin: null,
      accurancy: null
    }
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentDidUpdate() {
    if(this.state.countdownValue === 0) {
      clearInterval(this.interval);

      this.props.history.push({
        pathname: "/typing-result",
        result: {
          accurancy: this.state.accurancy,
          wordsPerMin: this.state.wordsPerMin
        }
      });
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleOnChange = event => {
    if (!this._started) {
      this.monitorTyping();
      this._started = true;
    }

    if([16,20].includes(event.keyCode)) { return; }

    let typedText = event.target.value;
    let currentIndex = typedText.length - 1;
    let backSpaceTyped = (event.keyCode || event.charCode) === 8;

    let mistypedIndexes = backSpaceTyped ? this.handleTypingBackward(typedText, currentIndex) : this.handleTypingForward(typedText, currentIndex);

    if(mistypedIndexes) {
      this.setState({ typedText, currentIndex, mistypedIndexes })
    } else {
      this.setState({ typedText, currentIndex })
    }
  }

  monitorTyping = () => {
    this.interval = setInterval(() => {
      let currentChar = document.querySelector(".current-char");
      let typedTextDiv = document.querySelector(".typed-text");

      if (currentChar) {
        let topOffset = currentChar.offsetTop;

        typedTextDiv.style.top = `-${topOffset}px`;
      }

      let minutes = parseInt(this.duration / 60); // move this to constructor
      let newCountdownValue = this.state.countdownValue - 1;
      let passedTime = this.duration - newCountdownValue;
      let typedWords = this.state.text
        .substring(0, this.state.currentIndex + 1)
        .split(" ").length - 1;

      if (typedWords > 0) {
        let wordsPerMin = parseInt((typedWords / passedTime) * (this.duration / minutes));
        let accurancy = (100 - ((this.state.mistypedIndexes.length / this.state.typedText.length) * 100));
        accurancy = Math.round(accurancy*100) / 100;

        if(this._mounted) {
          this.setState({ wordsPerMin, accurancy, countdownValue: newCountdownValue });
        }
      }
    }, 1000);
  }

  createCharacters = () => {
    let newText = this.state.text.replace(/ /g, '\u00a0').match(/\w+|\s+|,|./g);
    let characterIndex = 0;

    return [...newText].map((word, i) => {
      let chars = [...word].map( char => {
        let characterStyle = this.setupCharacterStyle(characterIndex)

        characterIndex += 1;

        return <Character
          char={char}
          classStyle={characterStyle}
          key={characterIndex}
        />
      });

      return <Word key={i}>
        {chars}
      </Word>
    })
  }

  handleTypingForward = (typedText, currentIndex) => {
    if (typedText[currentIndex] !== this.state.text[currentIndex]) {
      return [...this.state.mistypedIndexes, currentIndex]
    }
  }

  handleTypingBackward = (typedText, currentIndex) => {
    let currentIndexBeforeBackSpace = currentIndex + 1;

    if (this.state.mistypedIndexes.includes(currentIndexBeforeBackSpace)) {
      let mistypedIndexes = this.state.mistypedIndexes
        .filter( el => el !== currentIndexBeforeBackSpace);

      return mistypedIndexes;
    }
  }

  handleClick = (event) => {
    this.inputRef.current.focus();
  }

  setupCharacterStyle = (characterIndex) => {
    if (characterIndex > this.state.currentIndex + 1) { return; }

    let style = "";
    let typingStart = this.state.currentIndex === 0;

    if (this.state.mistypedIndexes.includes(characterIndex)) {
      style += "bg-red-400";
    }

    if ((this.state.currentIndex + 1 === characterIndex && !typingStart) || (characterIndex === 0 && typingStart)) {
      style += " underline current-char";
    }

    if (this.state.currentIndex >= characterIndex && !this.state.mistypedIndexes.includes(characterIndex)) {
      style += " bg-blue-400"
    }

    return style;
  }

  render() {
    return(
      <div className="flex flex-wrap justify-center" onClick={this.handleClick}>
        <div className="w-full flex justify-between py-8 text-4xl font-bold text-gray-900">
          <div className="px-12 w-1/3 flex justify-start">
            {this.state.accurancy}<span className="inline-block text-2xl">{this.state.accurancy ? "%" : ""}</span>
          </div>
          <div className="px-12 w-1/3 flex justify-center">
            {this.state.wordsPerMin}<span className="inline-block text-2xl">{this.state.wordsPerMin ? "wpm" : ""}</span>
          </div>
          <div className="px-12 w-1/3 flex justify-end">
            {this.state.countdownValue}<span className="inline-block text-2xl">{this.state.countdownValue ? "s" : ""}</span>
          </div>
        </div>
        <div className="bg-blue-200 border-t-4 border-gray-900 w-11/12 flex flex-wrap text-2xl font-bold text-gray-700 px-4 py-12 tracking-wider">
          <form>
            <input
              val={this.state.typedText}
              autoFocus
              onKeyUp={this.handleOnChange}
              style={{position: 'absolute', top: '-100px'}}
              ref={this.inputRef}
            />
          </form>
          <div className="h-64 overflow-hidden relative w-full">
            <div className="absolute typed-text">
              {this.createCharacters()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TypingBoard;
