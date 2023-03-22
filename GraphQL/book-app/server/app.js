require('dotenv').config()
const cors = require('cors')
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express();

mongoose.connect(`mongodb+srv://${process.env.API_USER}:${process.env.API_PASS}@book-app-backend.scara2d.mongodb.net/?retryWrites=true&w=majority`)
mongoose.connection.once('open', ()=> {
    console.log(`Connected to MongoDB as ${process.env.API_USER}`)
})
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT = 4000;
app.listen(PORT, ()=>console.log(`Now listening on port: ${PORT}`))