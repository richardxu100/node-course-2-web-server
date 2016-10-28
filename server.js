const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials'); // absolute path
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  // fs.appendFile('server.log', log + '\n');
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next(); // need this, or nothing loads
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs'); // next never called, so app.get() isn't called
// });

// this is middleware, app.use()
app.use(express.static(__dirname + '/public')); // in the wrapper function, __dirname

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the home page!'
  })
});

app.get('/about', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'About Page',
    welcomeMessage: 'Welcome to the about page!'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request man!'
  })
})

app.listen(port, () => {
  console.log(`The server is up on port ${port}`);
});
