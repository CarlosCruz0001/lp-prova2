import { EventEmitter } from 'events'
import cron from 'node-cron'
import { getBitcoinPrice } from '../services/coin_service.js'

export const coinEmitter = new EventEmitter()


const period = '*/30 * * * * *'


cron.schedule(period, async () => {
  const price = await getBitcoinPrice()
  coinEmitter.emit('btc_read', price)
})
