// Fallback to simple storage if MongoDB fails
let inquiries = [];

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
    switch (method) {
      case 'GET':
        if (id && id !== 'inquiries') {
          // Get single inquiry
          const inquiry = inquiries.find(i => i.id === id);
          if (!inquiry) {
            return res.status(404).json({ error: 'Inquiry not found' });
          }
          return res.status(200).json(inquiry);
        } else {
          // Get all inquiries
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
        inquiries.push(newInquiry);
        console.log('Inquiry created:', newInquiry.id, 'Total:', inquiries.length);
        return res.status(201).json(newInquiry);

      case 'PATCH':
        // Update inquiry
        if (!id || id === 'inquiries') {
          return res.status(400).json({ error: 'ID is required' });
        }
        const updateIndex = inquiries.findIndex(i => i.id === id);
        if (updateIndex === -1) {
          return res.status(404).json({ error: 'Inquiry not found' });
        }
        inquiries[updateIndex] = { ...inquiries[updateIndex], ...req.body };
        return res.status(200).json(inquiries[updateIndex]);

      case 'DELETE':
        // Delete inquiry
        if (!id || id === 'inquiries') {
          return res.status(400).json({ error: 'ID is required' });
        }
        const initialLength = inquiries.length;
        inquiries = inquiries.filter(i => i.id !== id);
        if (inquiries.length === initialLength) {
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
