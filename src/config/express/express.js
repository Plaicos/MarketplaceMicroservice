var express = require("express")
var app = express()
var router = function () {
    return require("express").Router()
}
//var cookieParser = require('cookie-parser')

// config body parser
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json())
//app.use(cookieParser())

module.exports = { express, app, router }