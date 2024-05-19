import playingCard from './playingCard.ts';

class CardDeck{
  private cards: playingCard[];

  constructor() {
    this.cards = this.createDeck();
  }
  private createDeck(): playingCard[] {
    const suits = ['diams', 'hearts', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck: playingCard[] = [];

    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push(new playingCard(rank, suit));
      }
    }
    return deck;
  }
  public getCard(): playingCard {
    if (this.cards.length === 0) {
       alert('Карт не осталось');
    }
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    return this.cards.splice(randomIndex, 1)[0]; // Удаляем и возвращаем карту
  }

  public getCards (howMany: number): playingCard[] {
    const cards: playingCard[] = [];
    for(let i = 0; i < howMany; i++) {
      const card = this.getCard();
      if (card){
        cards.push(card);
      }else {
        break;
      }
    }
    return cards;
  }
  getRemainingCardsCount(): number {
    return this.cards.length;
  }
}



export default CardDeck;
