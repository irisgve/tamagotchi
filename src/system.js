
const {
  askQuestion, displayBigMessage, displayMessage,
} = require('./utils/console');
const { PETSTORE } = require('./constants');
const Pet = require('./pet');
const Human = require('./human');

/**
 * Represents system-wide interactions
 *
 * @class System
 */
class System {
  constructor() {
    this.petStoreName = PETSTORE;
  }

  /**
   * Creates new Human and Pet classes from command line input
   *
   * @returns {Object} Object with initialized Human and Pet classes
   * @memberof System
   */
  async createHumanAndPet() {
    displayBigMessage(`Tamagotchi: ${this.petStoreName}`);

    const { playerName } = await askQuestion(`Welcome to ${this.petStoreName} Pet Store. What is your name?`, 'playerName');
    const human = new Human(playerName);

    displayMessage(`Thank you for visiting us, ${human.name}! Your new pet is hatching from it's egg...`);
    const pet = new Pet();

    await pet.hatchingEgg();
    displayMessage(`Congratulations, the egg hatched! Your new pet is a ${pet.gender.toUpperCase()} ${pet.animal.type.toUpperCase()}!!!`);

    return { human, pet };
  }
}

module.exports = System;
