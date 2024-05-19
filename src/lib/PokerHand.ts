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

  private isFlesh() {
    const suits = this.getSuits();
    return suits.every(suit => this.cards.every(card => card.suit === suit));
  }

  private FullHouse() {
    const values = Object.values(this.getCounts());
    return values.includes(3) && values.includes(2);
  }

  private FourOfaKind() {
    const values = Object.values(this.getCounts());
    return values.includes(4);
  }

  private isThreeOfAKind() {
    const counts = Object.values(this.getCounts());
    return counts.includes(3);
  }

  private isTwoPair() {
    const counts = Object.values(this.getCounts());
    return counts.filter(count => count === 2).length === 2;
  }

  private isStraight() {
    const ranks = this.getValues().map(val => {
      if (val === 'A') return 14;
      if (val === 'K') return 13;
      if (val === 'Q') return 12;
      if (val === 'J') return 11;
      return parseInt(val, 10);
    }).sort((a, b) => a - b);

    for (let i = 0; i < ranks.length - 1; i++) {
      if (ranks[i + 1] - ranks[i] !== 1) return false;
    }
    return true;
  }

  private isRoyalFlesh() {
    const values = this.getValues();
    return this.isStraight() && this.isFlesh() && ['10', 'J', 'Q', 'K', 'A'].every(rank => values.includes(rank));
  }

  private isStraightFlesh() {
    return this.isStraight() && this.isFlesh();
  }

  public getOutCome() {
    if (this.isRoyalFlesh()) return 'РОЯЛ-ФЛЕШ';
    if (this.isStraightFlesh()) return 'СТРИТ-ФЛЕШ';
    if (this.FourOfaKind()) return 'КАРЕ';
    if (this.FullHouse()) return 'ФУЛЛ ХАУС';
    if (this.isFlesh()) return 'ФЛЕШ';
    if (this.isStraight()) return 'СТРИТ';
    if (this.isThreeOfAKind()) return 'СЕТ';
    if (this.isTwoPair()) return 'ДВЕ ПАРЫ';
    if (Object.values(this.getCounts()).includes(2)) return 'ОДНА ПАРА';
    return 'СТАРШАЯ КАРТА';
  }
}

export default PokerHand;