const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const userListRouter = require("./router/userList")

const corsOptions = {
    origin: 'http://localhost:3000/',

};

const app = express();
app.use(express.json());
app.use(cors())
dotenv.config();



mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`DB is connected successfully!!`))
    .catch((err) => console.log(err))


////// Routers

app.use(`/api/v1/user`, userListRouter)

app.listen(process.env.PORT, () => console.log(`server is running on http://localhost:${process.env.PORT}`))
