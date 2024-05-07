require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./routers');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Update easypharmacy at port ${port}`)
});