import express from 'express'
import AdminRoute from './app/routes/AdminRoute.js'
import errorHandler from './app/middlewares/errorMiddleware.js'
import expressEjsLayouts from 'express-ejs-layouts'
import path from "path"
import conn from './app/config/ConnectDB.js'
// import db from './app/config/Database.js'
// import Matkul from './app/models/MatkulModel.js'
const app = express()

// Connect to Database using mysql module

    conn.connect((err) => {
        if (err) return console.log(err.message)
        console.log('database is connected...')
    })


// Connect to Database using Sequelize Module
// try {
//     await db.authenticate()
//     console.log('Database is connected...')
//     // await Matkul.sync()
// } catch (error) {
//     console.log('Database is not connected!', error.message)
// }

// set view engine use EJS
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.use(express.static(path.join('public')))

//middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(AdminRoute)
app.use(errorHandler)

// Connecting to server...
app.listen(5000, '0.0.0.0', () => console.log('Server berjalan pada portt 5000'))