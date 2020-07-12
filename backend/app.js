const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const addressesRouter = require('./routes/addresses');
const businessesRouter = require('./routes/businesses');
const categoriesRouter = require('./routes/categories');
const contactsRouter = require('./routes/contacts');
const ownersRouter = require('./routes/owners');
const reviewsRouter = require('./routes/reviews');

app.use('/addresses', addressesRouter);
app.use('/businesses', businessesRouter);
app.use('/categories', categoriesRouter);
app.use('/contacts', contactsRouter);
app.use('/owners', ownersRouter);
app.use('/reviews', reviewsRouter);

app.listen(port, () => console.log("Server running on port ", port));