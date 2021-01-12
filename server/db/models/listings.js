const Sequelize = require('sequelize')
const db = require('../db')

const Listings = db.define('listings', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sellerName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'eBooks'
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:
      'https://dynamicmediainstitute.org/wp-content/themes/dynamic-media-institute/imagery/default-thesis-abstract.png'
  }
})

module.exports = Listings
