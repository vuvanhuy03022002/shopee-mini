const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./models/User')
const Order = require('./models/Order') // 👈 phải lên trên

const app = express()

app.use(cors())
app.use(express.json())

// 🔥 CONNECT MONGODB
mongoose.connect('mongodb://127.0.0.1:27017/vueshop')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

// ================= REGISTER =================
app.post('/api/register', async (req, res) => {
  try {

    const hash = await bcrypt.hash(req.body.password, 10)

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash
    })

    res.json(user)

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: 'Email đã tồn tại'
      })
    }

    res.status(500).json({
      message: err.message
    })
  }
})

// ================= LOGIN =================
app.post('/api/login', async (req, res) => {
  try {

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const ok = await bcrypt.compare(req.body.password, user.password)

    if (!ok) {
      return res.status(400).json({ message: 'Wrong password' })
    }

    const token = jwt.sign({ id: user._id }, 'SECRET_KEY')

    res.json({ token })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ================= ORDER =================
app.post('/api/order', async (req, res) => {
  try {
    const order = await Order.create(req.body)

    res.json({
      message: 'Order created',
      order
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.get('/api/orders', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 })
  res.json(orders)
})

app.get('/api/order/:id', async (req, res) => {
  const order = await Order.findById(req.params.id)
  res.json(order)
})

// ================= START SERVER =================
app.listen(3000, () => {
  console.log('Server Running on http://localhost:3000')
})