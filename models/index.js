const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const gameModel = require('./game')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'

const config = require(__dirname + '/../config/config.json')[env]
const db = {}