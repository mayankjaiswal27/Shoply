let express = require("express")
let mongoose = require("mongoose")
let cors = require("cors")
let bodyParser = require("body-parser")
// let dbConfig = require('./database/db')

const userRoute = require("./routes/users")
const productRoute = require("./routes/products")
const orderRoute = require('./routes/orders')
require('dotenv').config({path: "./.env"})
const User = require("./models/User")
const loggerMw = require("./logger")

// mongoose.set("useNewUrlParser", true)
// mongoose.set("useFindAndModify", false);
// mongoose.set('useCreateIndex', true)
// mongoose.set('useUnifiedTopology', true)

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URL,{
    dbName: 'submission' 
});

mongoose.connection.on('connected', () => console.log('Database connected!'));
mongoose.connection.on('disconnected', () => console.log('Database disconnected!'));
mongoose.connection.on('error', (err) => console.log(`Database error ${err}`));


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true 
}))
app.use(cors())
app.use(loggerMw)
app.use('/users', userRoute)
app.use('/products', productRoute)
app.use('/orders', orderRoute)


app.post('/login', async (req, res) => {
    const {email, password} = req.body 

    try{
        const user = await User.findOne({email})

        if(!user) {
            return res.json({success: false, message: "User not found"})
        }

        if(password !== user.password) {
            return res.json({success: false, message: "Invalid Credentials"})
        }

        res.json({success: true, user, message: "Authentication Successful"})
    } catch(err) {
        res.status(500).json({success: false, message: err})
    }
})

app.post('/logout', (req, res) => {
    res.json({success: true, message: "Logout successful."})
})

const port = process.env.PORT || 8000

const server = app.listen(port, () => {
    console.log('Connected to port: ' + port)
})

app.use((req, res, next) => {
    res.status(404).send("Error 404!")
})

app.use(function (err, req, res, next)  {
    console.error(err.message)

    if(!err.statusCode) {
        err.statusCode = 500
    }

    res.status(err.statusCode).send(err.message);
})