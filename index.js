import express from 'express'
import AdminRoute from './app/routes/AdminRoute.js'
import AuthRoute from './auth/routes/AuthRoute.js'
import UserRoute from './auth/routes/UserRoute.js'
import errorHandler from './app/middlewares/errorMiddleware.js'
import expressEjsLayouts from 'express-ejs-layouts'
import path from "path"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import SequelizeStore from 'connect-session-sequelize'
import flash from 'connect-flash'
import conn from './app/config/ConnectDB.js'
import db from './app/config/Database.js'
import dotenv from "dotenv"
dotenv.config()

const app = express()

// Auth Session Store 
const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db: db
})
// store.sync();

// Connect to Database using mysql module
// try {
//     conn.connect((err) => {
//         if (err) return console.log(err.message)
//         console.log('penjadwalan-app is connected...')
//     })
// } catch (error) {
//     console.log(error.message)
// }

// Config Flash Session 
app.use(cookieParser('secret'))
app.use(flash())
// end-flash

// Connect to Database using Sequelize Module
try {
    await db.authenticate()
    console.log('Database is connected...')
    // if we need to create table automatically, delete comment below
    // await db.sync({force: true})
} catch (error) {
    console.log('Database is not connected!', error.message)
}

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
        secure: 'auto'
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
app.listen(process.env.PORTS, '0.0.0.0', () => console.log(`Server berjalan pada port ${process.env.PORTS}`))