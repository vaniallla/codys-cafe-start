const Sequelize = require('sequelize')
const db = require('./database')
const Coffee = require('./coffee.model')

const Pug = db.define('pugs', {
  name:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  age:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  biography: {
    type: Sequelize.TEXT,
  }
})

Pug.prototype.isPuppy = function () {
  if (this.age < 1) {
    return true;
  } else {
    return false;
  }
}

Pug.prototype.shortBio = function () {
  let bio = this.biography
  let arrOfBio = bio.split(/[\\.!?]/);
  return arrOfBio[0];
}


Pug.findByCoffee = async function (coffee) {
  const coffeeArr = await Coffee.findAll();
  let coffeeId;
  for (let i = 0; i < coffeeArr.length; i++) {
    if(coffeeArr[i].dataValues.name = coffee) {
      coffeeId = coffeeArr[i].dataValues.id;
    }
  }
  const pugsArr = await Pug.findAll();
  let pugsWithFavCoffee = [];
  for (let i = 0; i < pugsArr.length; i++) {
    if(pugsArr[i].dataValues.favoriteCoffeeId = coffeeId) {
      pugsWithFavCoffee.push(pugsArr[i].dataValues.name);
    }
  }
  return pugsWithFavCoffee;

}

module.exports = Pug
