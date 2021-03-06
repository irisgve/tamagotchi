const { Subject } = require('rxjs');

const {
  displayMessage,
} = require('./utils/console');
const {
  LIFEMETERMAX, LIFEMETERMIN, WASTEMAX, OLDAGE,
} = require('./constants');

/**
 * Represents pet status life meter
 *
 * @class Pet
 */
class Lifemeter {
  constructor() {
    this.hunger = LIFEMETERMAX;
    this.health = LIFEMETERMAX;
    this.happiness = LIFEMETERMAX;
    this.waste = 0;
    this.age = 1;

    this.isDead = new Subject();
    this.isHungry = new Subject();
    this.isSick = new Subject();
    this.isFilthy = new Subject();
    this.isSad = new Subject();
  }

  displayStatus() {
    displayMessage(`Current pet status:

    Age: ${this.getAge()} cycle old
    Happiness: ${this.getHappiness()}
    Hunger: ${this.getHunger()}
    Health: ${this.getHealth()}`);
  }

  getAge() {
    return this.age;
  }

  increaseAge() {
    if (this.age < OLDAGE) {
      this.age += 1;
    } else {
      this.isDead.next(true);
    }
  }

  getHunger() {
    return this.hunger;
  }

  increaseHunger() {
    this.increaseStat('hunger');
  }

  decreaseHunger() {
    this.decreaseStat('hunger', 'isHungry');
  }

  getHealth() {
    return this.health;
  }

  increaseHealth() {
    this.increaseStat('health');
  }

  decreaseHealth() {
    this.decreaseStat('health', 'isSick');
  }

  getHappiness() {
    return this.happiness;
  }

  increaseHappiness() {
    this.increaseStat('happiness');
  }

  decreaseHappiness() {
    this.decreaseStat('happiness', 'isSad');
  }

  getWaste() {
    return this.waste;
  }

  /**
   * Increment stat by 1 if less than life meter max threshold
   *
   * @param {string} stat
   * @memberof Lifemeter
   */
  increaseStat(stat) {
    if (this[stat] < LIFEMETERMAX) {
      this[stat] += 1;
    }
  }

  /**
   * Decrement stat by 1 if less than life meter max threshold or
   * emit isHungry < LIFEMETERMIN + isDead = 0 events
   *
   * @param {string} stat
   * @param {string} warningSubject specific subject to warn when < LIFEMETERMIN
   * @memberof Lifemeter
   */
  decreaseStat(stat, warningSubject) {
    if (this[stat] === 0) {
      this.isDead.next(true);
    } else if (this[stat] < LIFEMETERMIN) {
      this[warningSubject].next(true);
      this[stat] -= 1;
    } else {
      this[stat] -= 1;
    }
  }

  /**
   * Increment waste by 1 if waste >= WASTEMAX, decrement health
   *
   * @memberof Lifemeter
   */
  increaseWaste() {
    if (this.waste >= WASTEMAX) {
      this.decreaseHealth();
      this.isFilthy.next(true);
    } else {
      this.waste += 1;
    }
  }

  /**
   * Decrement waste by 1 if waste > 0
   *
   * @memberof Lifemeter
   */
  decreaseWaste() {
    if (this.waste > 0) {
      this.waste -= 1;
    }
  }
}

module.exports = Lifemeter;
