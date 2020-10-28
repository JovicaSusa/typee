import React from 'react';
import Character from './Character';
import Word from './Word';

class App extends React.Component {
  state = {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    typedText: "",
    mistypedIndexes: [],
    currentIndex: 0,
  }

  createCharacters = () => {
    let newText = this.state.text.replace(/ /g, '\u00a0').match(/\w+\s+/g);
    let letterIndex = 0;

    return [...newText].map((word, i) => {
      let chars = [...word].map( char => {
        let classes = "";

        if (this.state.mistypedIndexes.includes(letterIndex)) {
          classes += "bg-red-500";
        }

        if (this.state.currentIndex === letterIndex) {
          classes += " underline";
        }

        if (this.state.currentIndex >= letterIndex) {
          classes += " font-bold"
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
    return (
      <div className="w-full flex flex-wrap justify-center text-4xl text-gray-800 py-12 px-24 tracking-wider whitespace-pre-wrap">
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
    )
  }
};

export default App;
