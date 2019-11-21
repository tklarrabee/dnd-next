const fs = require('fs')
const Sequelize = require('sequelize');
const path = require('path')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'

const config = require(__dirname + '/../config/config.json')[env]
const db = {}