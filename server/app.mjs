import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import db from "./mongodb.mjs";

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }))

app.use(async (req, res, next) => {
  try {
    await next()
  } catch (error) {
    res.json({ ok: false, error: error.message })
  }
})

app.get('/api', (req, res) => {
  res.send('Hello!')
})

app.post('/api/login', async (req, res) => {
  if (req.cookies.jwt) {
    const { login } = jwt.verify(req.cookies.jwt, 'someSecret')
    const collection = db.collection('users')
    const result = await collection.findOne({ login })
    if (!result) res.json({ ok: false, error: 'Пользователь не найден!' })
    else res.json({ ok: true, data: result })
  } else {
    const { login } = req.body
    const collection = db.collection('users')
    const result = await collection.findOne({ login })
    if (!result) res.json({ ok: false, error: 'Пользователь не найден!' })
    else {
      res.cookie('jwt',
          jwt.sign({ login }, 'someSecret', {expiresIn: '14d'}),
          { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 14 }
      )
      res.json({ ok: true, data: result })
    }
  }
})

app.post('/api/register', async (req, res) => {
  const { login } = req.body
  const collection = db.collection('users')
  const result = await collection.findOne({ login })
  if (result) res.json({ ok: false, error: 'Пользователь уже существует!' })
  else {
    await collection.insertOne({ login, data: {} })
    res.cookie('jwt',
        jwt.sign({ login }, 'someSecret', {expiresIn: '14d'}),
        { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 14 }
    )
    res.json({ ok: true, data: { login }  })
  }
})

app.post('/api/logout', async (req, res) => {
  console.log('logout')
  res.clearCookie('jwt')
  res.json({ ok: true })
})

app.post('/api/push', async (req, res) => {
  const { data } = req.body
  const { login } = jwt.verify(req.cookies.jwt, 'someSecret')
  const collection = db.collection('users')
  await collection.updateOne({ login }, {$set: { data }})
  res.json({ ok: true })
})

app.listen(process.env.SERVER_PORT, () => console.log('App listening!'))
