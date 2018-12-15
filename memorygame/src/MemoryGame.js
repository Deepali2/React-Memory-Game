import React, { Component } from 'react';
import './MemoryGame.css';
import Card from './Card';
import NavBar from './NavBar';
import shuffle from './shuffle';

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
};

class MemoryGame extends Component {
  constructor(props) {
    super(props);
   
    let cards =[
      {id: 0, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 1, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 2, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 3, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 4, cardState: CardState.HIDING, backgroundColor: 'blue'},
      {id: 5, cardState: CardState.HIDING, backgroundColor: 'blue'},
      {id: 6, cardState: CardState.HIDING, backgroundColor: 'orange'},
      {id: 7, cardState: CardState.HIDING, backgroundColor: 'orange'},
      {id: 8, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 9, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 10, cardState: CardState.HIDING, backgroundColor: 'brown'},
      {id: 11, cardState: CardState.HIDING, backgroundColor: 'brown'},
      {id: 12, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 13, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 14, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 15, cardState: CardState.HIDING, backgroundColor: 'yellow'},
    ];
    
    this.state={cards:shuffle(cards), noClick: false};

    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

 handleClick(id) {
   this.setState(prevState => {
     let cards = prevState.cards.map(card => (
       card.id === id ? {
         ...card, cardState: card.cardState === CardState.HIDING? CardState.SHOWING: CardState.HIDING
       }
       : card
     ));
     return {cards};
   });
 }

 handleNewGame() {
   let cards = this.state.cards.map(card => (
     {...card, cardState: CardState.HIDING}
   ));
   cards = shuffle(cards);
   this.setState({cards});
 }


  render() {
    const cards = this.state.cards.map(card => (
      <Card key={card.id} 
        showing={card.cardState !== CardState.HIDING} 
        backgroundColor={card.backgroundColor}
        onClick={()=>this.handleClick(card.id)}
        />
    ));
    return (
      <div className="App">
        <NavBar onNewGame={this.handleNewGame}/>
        {cards}
      </div>
    );
  }
}

export default MemoryGame;
