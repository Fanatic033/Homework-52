import './App.css';
import Card from './components/Card/Card.tsx';
import './lib/CardDeck.ts';
import React, {useState} from 'react';
import playingCard from './lib/playingCard.ts';
import CardDeck from './lib/CardDeck.ts';

const App: React.FC = () => {
  const [cards, setCards] = useState<playingCard[]>([]);
  const displayCards = () => {
    const deck = new CardDeck();
    const newCards = deck.getCards(5);
    setCards(newCards);
  };
  return (
    <>
      <button onClick={displayCards}>Раздать карты</button>
      {cards.length > 0 && (
        <div className="playingCards faceImages">
          {cards.map((card, index) => (
            <Card key={index} rank={card.rank} suit={card.suit} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
