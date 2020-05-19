const express = require('express')
const path = require('path')
const app = express()
const PORT = 3030

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '..', '/public')))

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})


const server = app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT}`)
})