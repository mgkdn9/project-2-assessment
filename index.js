const express = require('express')
const methodOverride = require('method-override')
let db = require('./models')

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static('static'))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public/'))

// WRITE YOUR ROUTES HERE /////////////
app.get('/', (req, res) => {
  db.widget.findAll()
  .then(widgets => {
    res.render('index',{widgets})
  })
})

app.post('/', (req, res) => {
  db.widget.create({
    description:  req.body.description,
    quantity:     req.body.quantity
  })
  .then(() => {
    res.redirect('/')
  })
})

app.delete('/widget/:id', (req, res) => {
  db.widget.destroy({
    where: { id : req.params.id }
  })
  .then(deletedItem => {
    //destroy() returns 1 if deleted, 0 if nothing
    res.redirect('/')
  })
  .catch(error => 
    console.error
  )
})
// YOUR ROUTES ABOVE THIS COMMENT /////

app.listen(process.env.PORT || 3000, () => {console.log('listening on port 3000')})