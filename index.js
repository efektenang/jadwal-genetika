import express from 'express'
import AdminRoute from './app/routes/AdminRoute.js'
import errorHandler from './app/middlewares/errorMiddleware.js'
import db from './app/config/Database.js'
// import Matkul from './app/models/MatkulModel.js'
const app = express()

// Connect to Database
try {
    await db.authenticate()
    console.log('Database is connected...')
    // await Matkul.sync()
} catch (error) {
    console.log(error)
}

//middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(AdminRoute)
app.use(errorHandler)

// Connecting to server...
app.listen(5000, () => console.log('Server berjalan pada portt 5000'))