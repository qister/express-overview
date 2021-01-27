import express from 'express'
import path from 'path'
import { requestTime, logger } from './middlwares.js'
import serverRoutes from './routes/servers.js'

const __dirname = path.resolve()

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(requestTime)
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(serverRoutes)

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))

app.get('/', (req, res) => {
  res.render('index', { title: 'Main page', active: 'main' })
})

app.get('/features', (req, res) => {
  res.render('features', { title: 'features page', active: 'features' })
})

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
// })

// app.get('/features', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'static', 'features.html'))
// })

// app.get('/download', (req, res) => {
//   console.log(req.requestTime);
//   res.download(path.resolve(__dirname, 'static', 'index.html'))
// })

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}...`)
})
