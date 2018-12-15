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
   //define a function that will return the cards array with the cardState of some changed
   const mapCardsState = (cards, idsToChange, newCardState) => {
     return cards.map(card => {
       if (idsToChange.includes(card.id)) {
         return {...card, cardState: newCardState};
       }
       return card;
     });
   };
   //find the card in the cards array, that has been clicked upon 
   const foundCard = this.state.cards.find(card => card.id === id);
   //if the clicked upon card is one that is already showing and one that needs to remain showing then just return
   if (this.state.noClick || foundCard.cardState !== CardState.HIDING) return;
   let noClick = false;
   //open up the card with the id
   let cards = mapCardsState(this.state.cards, [id], CardState.SHOWING);
   //make an array of all the cards that are SHOWING
   const showingCards = cards.filter((card) => card.cardState === CardState.SHOWING);
   //make an array of the ids of all the cards that are SHOWING
   const ids = showingCards.map(card => card.id);
   //if there are two cards that are showing and if their background colors match then change their state to MATCHING
   if (showingCards.length === 2 && showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
     cards = mapCardsState(cards, ids, CardState.MATCHING);
     //otherwise hide the cards after 1.3 seconds
   } else if(showingCards.length === 2) {
     let hidingCards = mapCardsState(cards, ids, CardState.HIDING);
     noClick = true;
     this.setState({cards, noClick}, () => {
       setTimeout(() => {
         this.setState({cards: hidingCards, noClick: false});
       }, 1300);
     });
     return;
   }
   this.setState({cards, noClick});
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
