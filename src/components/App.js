import React from 'react';
import Character from './Character';

class App extends React.Component {
  state = {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently    with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    typedText: "",
    mistypedIndexes: []
  }

  createCharacters = () => {
    return [...this.state.text].map((char, i) => {
      return <Character char={char} key={i} />
    })
  }

  handleOnChange = event => {
    this.setState({ typedText: event.target.value })
    let currentIndex = this.state.typedText.length;

    if (event.target.value[currentIndex] !== this.state.text[currentIndex]) {
      this.setState({ mistypedIndexes: [...this.state.mistypedIndexes, currentIndex] })
    }
  }

  render() {
    return (
      <div className="w-full flex flex-wrap justify-center">
        <form>
          <input autoFocus onChange={this.handleOnChange} style={{position: 'absolute', top: '-100px'}} />
        </form>
        {this.createCharacters()}
      </div>
    )
  }
};

export default App;
