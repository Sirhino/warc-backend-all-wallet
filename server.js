const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Store connected wallets
let connectedWallets = []

// Connect wallet endpoint
app.post('/api/connect', (req, res) => {
  const { address, wallet } = req.body
  
  // Check if wallet already exists
  const exists = connectedWallets.find(w => w.address === address)
  
  if (!exists) {
    connectedWallets.push({
      address,
      wallet,
      connectedAt: new Date()
    })
  }
  
  res.json({ success: true, address })
})

// Get all connected wallets
app.get('/api/wallets', (req, res) => {
  res.json(connectedWallets)
})

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Warc Backend Running' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
