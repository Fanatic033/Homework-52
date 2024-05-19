import './App.css';
import Card from './components/Card/Card.tsx';
import './lib/CardDeck.ts';
import React, {useState} from 'react';
import playingCard from './lib/playingCard.ts';
import CardDeck from './lib/CardDeck.ts';

const App: React.FC = () => {
  const [deck] = useState(new CardDeck());
  const [cards, setCards] = useState<playingCard[]>([]);
  const [remainingCards, setRemainingCards] = useState<number>(deck.getRemainingCardsCount());
  const displayCards = () => {
    const newCards = deck.getCards(5);
    if (newCards.length < 5) {
      alert('Недостаточно карт для раздачи.');
    } else {
      setCards(newCards);
    }
    setRemainingCards(deck.getRemainingCardsCount());
  };
  return (
    <>
      <div>Осталось карт: {remainingCards}</div>
      <button onClick={displayCards}>Раздать карты</button>
      {cards.length > 0 && (
        <div className="playingCards faceImages">
          {cards.map((card, index) => (
            <Card key={index} rank={card.rank} suit={card.suit}/>
          ))}
        </div>
      )}
    </>
  );
};

export default App;
