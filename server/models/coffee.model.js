const Sequelize = require('sequelize')
const db = require('./database')

const Coffee = db.define('coffee', {
  name:{
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    defaultValue: []
  }
})

Coffee.prototype.getIngredients = function () {
  let arrOfIngredients = this.ingredients;
  return arrOfIngredients.join(', ');
}

const Op = Sequelize.Op;
Coffee.findByIngredient = async (ingredient) => {
  const coffeeWithIngredient = await Coffee.findAll({
    where: {
      ingredients: {
        [Op.contains]: [ingredient]
      }
    }
  });
  return coffeeWithIngredient;
}

Coffee.afterValidate((coffee) => {
  if (coffee.ingredients.indexOf('love') < 0) {
    coffee.ingredients.push('love');
  }
})

module.exports = Coffee
