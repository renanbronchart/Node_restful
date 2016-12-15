const express = require('express');
const hostname = 'localhost';
const port = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
let contacts = require('./data');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
  if (!contacts) {
    res.status(404).json({ message: 'No contacts found' });
  }

  res.json(contacts);
});


app.get('/api/contacts/:id', (req, res) => {
  let requestId = req.params.id

  let contact = contacts.filter((contact) => {
    return contact.id == requestId;
  })

  if (!contact) {
    res.status(404).json({ message: 'No contacts found' });
  }

  res.json(contact[0]);
})

app.post('/api/contacts', (req, res) => {
  const contact = {
    id: contacts.length + 1,
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    website : req.body.website
  }

  contacts.push(contact);

  res.json(contact);
});


app.put('/api/contacts/:id', (req, res) => {
  const requestId = req.params.id;

  let contact = contacts.filter( (contact) => {
    return contact.id == requestId;
  })[0];

  const index = contacts.indexOf(contact);

  const keys = Object.keys(req.body);

  keys.forEach((key) => {
    contact[key] = req.body[key];
  });

  contacts[index] = contact;

  res.json(contacts[index]);
});



app.listen(port, hostname, () => {
  console.log(`Server is running on adress http://${hostname}:${port}`)
});
