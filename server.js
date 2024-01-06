const { default: mongoose } = require("mongoose");
const { MONGODB_URI, PORT } = require("./utils/config");
const express = require('express');
const cors = require('cors');
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login');
const passwordRouter = require('./controller/passwordrese');

const app = express();
app.use(cors());
app.use(express.json())

app.use('/api/users', usersRouter);
app.use('/api/passwordreset', passwordRouter);
app.use('/api/login', loginRouter);

mongoose.set('strictQuery', false)

console.log('connecting to MongoDB...', MONGODB_URI )

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB...');
    app.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message);
  });