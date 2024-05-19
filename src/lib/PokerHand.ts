import playingCard from './playingCard.ts';

class PokerHand {
  private cards: playingCard[];

  constructor(cards: playingCard[]) {
    this.cards = cards;
  }

  private getValues() {
    return this.cards.map(card => card.rank);
  }

  private getSuits() {
    return this.cards.map(card => card.suit);
  }

  private getCounts() {
    const values = this.getValues();
    const counts: { [key: string]: number } = {};
    for (const value of values) {
      if (!counts[value]) counts[value] = 1;
      else counts[value] += 1;
    }
    return counts;
  }

  private isFlesh () {
    const suits = this.getSuits();
    return suits.every(suit => this.cards.every(card => card.suit === suit));
  }
  public getOutCome() {
    const isFlesh = this.isFlesh();
    if (isFlesh) return 'Flesh';
    const valueCounts = this.getCounts();
    const uniqueValue = Object.values(valueCounts);
    if (uniqueValue.includes(3)) return 'СЕТ';
    if (uniqueValue.filter(count => count === 2).length === 2) return 'ДВЕ ПАРЫ';
    if (uniqueValue.includes(2)) return 'ОДНА ПАРА';

    return 'СТАРШАЯ КАРТА';
  }
}
export default  PokerHand;