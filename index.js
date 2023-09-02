const express = require('express')
const AdminRoute = require('./app/routes/AdminRoute.js')
const AuthRoute = require('./auth/routes/AuthRoute.js')
const UserRoute = require('./auth/routes/UserRoute.js')
const errorHandler = require('./app/middlewares/errorMiddleware.js')
const expressEjsLayouts = require('express-ejs-layouts')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')
const flash = require('connect-flash')
const conn = require('./app/config/ConnectDB.js')
const db = require('./app/config/Database.js')
const dotenv = require('dotenv')
// import Ruang from './app/models/RuangModel.js'
// import Users from './auth/models/UserModel.js'
dotenv.config()

const app = express()

// Auth Session Store 
const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db: db
})
// store.sync();

// Connect to Database using mysql module
try {
    conn.connect((err) => {
        if (err) return console.log(err.message)
        console.log('penjadwalan-app is connected...')
    })
} catch (error) {
    console.log(error.message)
}

// Config Flash Session 
app.use(cookieParser('secret'))
app.use(flash())
// end-flash

// Connect to Database using Sequelize Module
// try {
//     db.authenticate()
//     console.log('Database is connected...')
//     // if we need to create table automatically, delete comment below
//     // await db.sync({force: true})
// } catch (error) {
//     console.log('Database is not connected!', error.message)
// }

// set view engine use EJS
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.use(express.static(path.join('public')))

//middlewares
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
        maxAge: 3600000
    }
}))

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(AdminRoute)
app.use(UserRoute)
app.use(AuthRoute)
app.use(errorHandler)

// Connecting to server...
const port = process.env.PORT || 9001
app.listen(port, () => console.log(`Server is running on port ${port}`))