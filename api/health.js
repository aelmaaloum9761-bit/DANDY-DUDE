module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  return res.status(200).json({ 
    status: 'ok', 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
}
