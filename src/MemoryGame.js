import React, { Component } from 'react';
import './MemoryGame.css';
import Card from './Card';
import NavBar from './NavBar';
import shuffle from './shuffle';
import WinMessage from './WinMessage';


const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
};

const CardText = {
  FIND: 'Find My Match',
  SHOW: 'SHOWING',
  MATCH: 'MATCH FOUND!'
};

const Level = {
  EASY: [2, 3, 4, 5],
  MEDIUM: [0, 1, 2, 3, 4, 5, 6, 7],
  HARD: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  SUPERHARD: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  ULTIMATE: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
};

let cards =[
  {id: 0, cardState: CardState.HIDING, backgroundColor: 'red', cardText: CardText.FIND},
  {id: 1, cardState: CardState.HIDING, backgroundColor: 'red', cardText: CardText.FIND},
  {id: 2, cardState: CardState.HIDING, backgroundColor: 'green', cardText: CardText.FIND},
  {id: 3, cardState: CardState.HIDING, backgroundColor: 'green', cardText: CardText.FIND},
  {id: 4, cardState: CardState.HIDING, backgroundColor: 'blue', cardText: CardText.FIND},
  {id: 5, cardState: CardState.HIDING, backgroundColor: 'blue', cardText: CardText.FIND},
  {id: 6, cardState: CardState.HIDING, backgroundColor: 'orange', cardText: CardText.FIND},
  {id: 7, cardState: CardState.HIDING, backgroundColor: 'orange', cardText: CardText.FIND},
  {id: 8, cardState: CardState.HIDING, backgroundColor: 'pink', cardText: CardText.FIND},
  {id: 9, cardState: CardState.HIDING, backgroundColor: 'pink', cardText: CardText.FIND},
  {id: 10, cardState: CardState.HIDING, backgroundColor: 'brown', cardText: CardText.FIND},
  {id: 11, cardState: CardState.HIDING, backgroundColor: 'brown', cardText: CardText.FIND},
  {id: 12, cardState: CardState.HIDING, backgroundColor: 'purple', cardText: CardText.FIND},
  {id: 13, cardState: CardState.HIDING, backgroundColor: 'purple', cardText: CardText.FIND},
  {id: 14, cardState: CardState.HIDING, backgroundColor: 'yellow', cardText: CardText.FIND},
  {id: 15, cardState: CardState.HIDING, backgroundColor: 'yellow', cardText: CardText.FIND},

  {id: 16, cardState: CardState.HIDING, backgroundColor: 'DarkViolet', cardText: CardText.FIND},
  {id: 17, cardState: CardState.HIDING, backgroundColor: 'DarkViolet', cardText: CardText.FIND},
  {id: 18, cardState: CardState.HIDING, backgroundColor: 'LightCyan', cardText: CardText.FIND},
  {id: 19, cardState: CardState.HIDING, backgroundColor: 'LightCyan', cardText: CardText.FIND},
  {id: 20, cardState: CardState.HIDING, backgroundColor: 'LightSeaGreen', cardText: CardText.FIND},
  {id: 21, cardState: CardState.HIDING, backgroundColor: 'LightSeaGreen', cardText: CardText.FIND},
  {id: 22, cardState: CardState.HIDING, backgroundColor: 'MediumSlateBlue', cardText: CardText.FIND},
  {id: 23, cardState: CardState.HIDING, backgroundColor: 'MediumSlateBlue', cardText: CardText.FIND},
  {id: 24, cardState: CardState.HIDING, backgroundColor: 'Salmon', cardText: CardText.FIND},
  {id: 25, cardState: CardState.HIDING, backgroundColor: 'Salmon', cardText: CardText.FIND},
  {id: 26, cardState: CardState.HIDING, backgroundColor: 'Thistle', cardText: CardText.FIND},
  {id: 27, cardState: CardState.HIDING, backgroundColor: 'Thistle', cardText: CardText.FIND},
  {id: 28, cardState: CardState.HIDING, backgroundColor: 'SlateBlue', cardText: CardText.FIND},
  {id: 29, cardState: CardState.HIDING, backgroundColor: 'SlateBlue' , cardText: CardText.FIND},
  {id: 30, cardState: CardState.HIDING, backgroundColor: 'Olive', cardText: CardText.FIND},
  {id: 31, cardState: CardState.HIDING, backgroundColor: 'Olive', cardText: CardText.FIND},
]; 


class MemoryGame extends Component {
  constructor(props) {
    super(props);  
    let hardcards = this.chooseCards(cards, Level.HARD);
    this.state={cards:shuffle(hardcards), noClick: false, winMessage:''};

    this.handleClick = this.handleClick.bind(this);    
    this.handleEasyGame = this.handleEasyGame.bind(this);
    this.handleMediumGame = this.handleMediumGame.bind(this);
    this.handleHardGame = this.handleHardGame.bind(this);
    this.handleSuperhardGame = this.handleSuperhardGame.bind(this);
    this.handleUltimateGame = this.handleUltimateGame.bind(this);
    this.chooseCards = this.chooseCards.bind(this);
  }

 handleClick(id) {
   //define a function that will return the cards array with the cardState of some changed
   const mapCardsState = (cards, idsToChange, newCardState, newCardText) => {
     return cards.map(card => {
       if (idsToChange.includes(card.id)) {
         return {...card, cardState: newCardState, cardText: newCardText};
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
   let cards = mapCardsState(this.state.cards, [id], CardState.SHOWING, CardText.SHOW);
   //make an array of all the cards that are SHOWING
   const showingCards = cards.filter((card) => card.cardState === CardState.SHOWING);
   //make an array of the ids of all the cards that are SHOWING
   const ids = showingCards.map(card => card.id);
   //if there are two cards that are showing and if their background colors match then change their state to MATCHING
   if (showingCards.length === 2 && showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
     cards = mapCardsState(cards, ids, CardState.MATCHING, CardText.MATCH);
     //check if all the cards have been matched
     let matchingCards = cards.filter((card) => card.cardState === CardState.MATCHING);
     if (matchingCards.length === this.state.cards.length) {
       this.setState({cards: matchingCards, noClick: true, winMessage: 'YOU WON!!!'})
     }
     //otherwise hide the cards after 1.3 seconds
   } else if(showingCards.length === 2) {
     let hidingCards = mapCardsState(cards, ids, CardState.HIDING, CardText.FIND);
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

 chooseCards(cards, ids) {
  return cards.filter(card => ids.includes(card.id));
 }

 handleEasyGame() {
   let easycards = this.chooseCards(cards, Level.EASY);   
   this.setState({cards: shuffle(easycards), noClick: false, winMessage:''});
 }

 handleMediumGame() {
  let mediumcards = this.chooseCards(cards, Level.MEDIUM);
  this.setState({cards: shuffle(mediumcards), noClick: false, winMessage:''});
 }

 handleHardGame() {
  let hardcards = this.chooseCards(cards, Level.HARD);
  this.setState({cards: shuffle(hardcards), noClick: false, winMessage:''});
 }

 handleSuperhardGame() {
  let superhardcards = this.chooseCards(cards, Level.SUPERHARD);
  this.setState({cards: shuffle(superhardcards), noClick: false, winMessage:''});
 }

 handleUltimateGame() {
  let ultimatecards = this.chooseCards(cards, Level.ULTIMATE);
  this.setState({cards: shuffle(ultimatecards), noClick: false, winMessage:''});
 }


  render() {
    const cards = this.state.cards.map(card => (
      <Card key={card.id} 
        showing={card.cardState !== CardState.HIDING} 
        backgroundColor={card.backgroundColor}
        onClick={()=>this.handleClick(card.id)}
        cardText={card.cardText}
        />
    ));
    return (
      <div className="App">
        <NavBar 
          easyGame={this.handleEasyGame}
          mediumGame={this.handleMediumGame}
          hardGame={this.handleHardGame}
          superhardGame={this.handleSuperhardGame}
          ultimateGame={this.handleUltimateGame}          
        />
        <WinMessage winMessage={this.state.winMessage}/>
        {cards}
        <h5>Designed and Maintained by deepaligarg1001@gmail.com </h5>
      </div>
    );
  }
}

export default MemoryGame;
