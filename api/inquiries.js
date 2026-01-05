const { MongoClient } = require('mongodb');

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI || 'mongodb+srv://dandydudes:dandydudes2026@cluster0.mongodb.net/dandydudes?retryWrites=true&w=majority';
  
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('dandydudes');
  
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method } = req;
  const pathParts = req.url.split('/');
  const id = pathParts[pathParts.length - 1] !== 'inquiries' ? decodeURIComponent(pathParts[pathParts.length - 1]) : null;

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('inquiries');

    switch (method) {
      case 'GET':
        if (id && id !== 'inquiries') {
          // Get single inquiry
          const inquiry = await collection.findOne({ id: id });
          if (!inquiry) {
            return res.status(404).json({ error: 'Inquiry not found' });
          }
          return res.status(200).json(inquiry);
        } else {
          // Get all inquiries
          const inquiries = await collection.find({}).sort({ createdAt: -1 }).toArray();
          return res.status(200).json(inquiries);
        }

      case 'POST':
        // Create new inquiry
        const newInquiry = {
          id: `INQ-${Date.now()}`,
          ...req.body,
          createdAt: new Date().toISOString(),
          status: req.body.status || 'pending'
        };
        await collection.insertOne(newInquiry);
        console.log('Inquiry created:', newInquiry.id);
        return res.status(201).json(newInquiry);

      case 'PATCH':
        // Update inquiry
        if (!id || id === 'inquiries') {
          return res.status(400).json({ error: 'ID is required' });
        }
        const updateResult = await collection.findOneAndUpdate(
          { id: id },
          { $set: req.body },
          { returnDocument: 'after' }
        );
        if (!updateResult.value) {
          return res.status(404).json({ error: 'Inquiry not found' });
        }
        return res.status(200).json(updateResult.value);

      case 'DELETE':
        // Delete inquiry
        if (!id || id === 'inquiries') {
          return res.status(400).json({ error: 'ID is required' });
        }
        const deleteResult = await collection.deleteOne({ id: id });
        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ error: 'Inquiry not found' });
        }
        return res.status(200).json({ message: 'Inquiry deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
