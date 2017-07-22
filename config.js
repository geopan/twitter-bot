module.exports = {
  twitter: {
    consumer_key: process.env.CONS_KEY || '',
    consumer_secret: process.env.CONS_SECRET ||'',
    access_token_key: process.env.ACCESS_KEY || '',
    access_token_secret: process.env.ACCESS_SECRET || ''
  }, 
  instagram: {
    access_token: process.env.IG_ACCES_TOK || '',
    client_id: process.env.IG_CLIENT_ID || '',
    client_secret: process.env.IG_SECRET || ''
  },
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost/geobot',
  },
}