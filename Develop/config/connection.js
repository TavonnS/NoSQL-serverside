const { connect, connection } = require('mongoose');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/NoSQL-appDB', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = connection;