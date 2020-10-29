import React from 'react';
import Character from './Character';
import Word from './Word';

class TypingBoard extends React.Component {
  constructor(props) {
    super(props);

    this.duration = props.location.duration || 60;
    this.state = {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently   with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      typedText: "",
      mistypedIndexes: [],
      currentIndex: 0,
      countdownValue: this.duration,
      wordsPerMin: null,
      accurancy: null
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ countdownValue: this.state.countdownValue - 1 });
      let minutes = parseInt(this.duration / 60);

      let passedTime = this.duration - this.state.countdownValue;
      let typedWords = this.state.text
        .substring(0, this.state.currentIndex + 1)
        .split(" ").length - 1;

      if (typedWords > 0) {
        let wordsPerMin = parseInt((typedWords / passedTime) * (this.duration / minutes));
        let accurancy = parseInt(100 - ((this.state.mistypedIndexes.length / this.state.typedText.length) * 100));
        this.setState({ wordsPerMin, accurancy });
      }
    }, 1000);
  }

  componentDidUpdate() {
    if(this.state.countdownValue == 0) {
      clearInterval(this.interval);
      this.props.history.push({
        pathname: "/result",
        result: this.state.wordsPerMin
      });
    }
  }

  createCharacters = () => {
    let newText = this.state.text.replace(/ /g, '\u00a0').match(/\w+|\s+|,|./g);
    let letterIndex = 0;

    return [...newText].map((word, i) => {
      let chars = [...word].map( char => {
        let classes = "";
        let typingStart = this.state.currentIndex === 0;

        if (this.state.mistypedIndexes.includes(letterIndex)) {
          classes += "bg-red-400";
        }

        if ((this.state.currentIndex + 1 === letterIndex && !typingStart) || (letterIndex === 0 && typingStart)) {
          classes += " underline text-gray-900";
        }

        if (this.state.currentIndex >= letterIndex && !this.state.mistypedIndexes.includes(letterIndex)) {
          classes += " bg-blue-400"
        }

        letterIndex += 1;

        return <Character
          char={char}
          style={classes}
          key={letterIndex}
        />
      });

      return <Word key={i}>
        {chars}
      </Word>
    })
  }

  handleOnChange = event => {
    if([16,20].includes(event.keyCode)) { return; }

    let typedText = event.target.value;
    let currentIndex = typedText.length - 1;

    let isNotBackSpace = (event.keyCode || event.charCode) != 8;

    this.setState({typedText, currentIndex})

    if (event.target.value[currentIndex] !== this.state.text[currentIndex] && isNotBackSpace) {
      this.setState({ mistypedIndexes: [...this.state.mistypedIndexes, currentIndex] })
    } else if (this.state.mistypedIndexes.includes(currentIndex) || this.state.mistypedIndexes.includes(currentIndex + 1)) {
      this.setState({
        mistypedIndexes: this.state.mistypedIndexes.filter(el => {
          return el != currentIndex && el != currentIndex + 1;
        })
      });
    }
  }

  render() {
    return(
      <div className="flex flex-wrap justify-center">
        <div className="w-full flex justify-between py-8 text-4xl font-bold text-gray-900">
          <div className="px-12">
            {this.state.accurancy}<span className="inline-block text-2xl">{this.state.accurancy ? "%" : ""}</span>
          </div>
          <div className="px-12">
            {this.state.wordsPerMin}<span className="inline-block text-2xl">{this.state.wordsPerMin ? "wpm" : ""}</span>
          </div>
          <div className="px-12">
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
            />
          </form>
          {this.createCharacters()}
        </div>
      </div>
    );
  }
}

export default TypingBoard;
