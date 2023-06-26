
const API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'


export const getBitcoinPrice = async () => {
  const response = await fetch(API_URL)
  const data = await response.json()
  const { bitcoin } = data
  const { usd } = bitcoin
  return usd
}
