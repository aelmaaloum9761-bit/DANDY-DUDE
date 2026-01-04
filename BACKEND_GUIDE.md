# DANDY DUDES - Backend Setup Complete! 🎉

## ✅ What Has Been Set Up

Your e-commerce site now has a complete backend system with:

### 1. **Backend Server** (Node.js + Express)
   - REST API for managing customer inquiries
   - JSON file-based database storage
   - Email notification system (optional)

### 2. **Admin Panel**
   - View all customer inquiries
   - See customer contact information (name, phone, email, address)
   - View ordered items for each inquiry
   - Update inquiry status (Pending, Contacted, Completed, Cancelled)
   - Delete inquiries

### 3. **Customer Flow**
   - Customers click "Add to Inquiry" on products
   - Fill out contact form with their information
   - Submit inquiry
   - See confirmation message

---

## 🚀 How to Use

### Starting Your Website

You need **TWO** terminals running at the same time:

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
```
Server runs on: http://localhost:5000

**Terminal 2 - Frontend (React):**
```bash
npm start
```
Website runs on: http://localhost:3000

---

## 📱 Accessing the Admin Panel

Once both servers are running, go to:

**http://localhost:3000/admin**

Here you can:
- ✅ See all customer inquiries
- ✅ View customer phone numbers and contact details
- ✅ Check what products they want to buy
- ✅ Update the status after calling them
- ✅ Delete old inquiries

---

## 📞 How to Get Customer Information

### When a customer submits an inquiry:

1. **Their data is automatically saved** to `server/data/inquiries.json`
2. **Go to the admin panel** at http://localhost:3000/admin
3. **See all inquiries** with customer phone numbers
4. **Click on any inquiry** to see full details:
   - Customer Name
   - **Phone Number** (clickable to call)
   - Email Address
   - Full Address
   - Products they want to order

### Example Admin View:
```
ID: INQ-1735934567890
Date: Jan 3, 2026
Customer: Ahmed Hassan
Phone: +212 6 12 34 56 78  ← Click to call
Email: ahmed@example.com
Items: 3 products
Status: Pending
```

---

## 🔧 Optional: Email Notifications

To receive an email whenever a customer submits an inquiry:

1. Open `server/server.js`
2. Find line 60-64 (email configuration)
3. Replace with your Gmail:
   ```javascript
   user: 'your-email@gmail.com',
   pass: 'your-app-password'
   ```
4. Uncomment line 117 to enable email sending
5. Restart the server

**Note:** You need a Gmail App Password (not your regular password). Search "Gmail App Password" to learn how to create one.

---

## 📂 Where Customer Data is Stored

All inquiry data is saved in:
```
server/data/inquiries.json
```

You can open this file to see all customer information in JSON format, or use the admin panel for a better view.

---

## 🎯 Customer Journey

1. Customer browses products
2. Clicks "Add to Inquiry" button
3. Gets redirected to inquiry page
4. Sees their selected products
5. Fills out contact form (name, phone, address, etc.)
6. Clicks "Submit Inquiry"
7. Sees "Order Confirmed - We will call you within 24 hours"
8. **You see their inquiry in the admin panel immediately**

---

## 🔐 Security Note

The admin panel (/admin) is currently accessible to anyone. For production:
- Add password protection
- Use proper authentication
- Host on a secure server

---

## 📞 Next Steps

1. **Test the flow:**
   - Add a product to inquiry
   - Fill out the form
   - Submit
   - Check admin panel

2. **Call your customers:**
   - Click on their phone number in admin panel
   - Confirm their order
   - Mark as "Contacted" or "Completed"

3. **Optional upgrades:**
   - Set up email notifications
   - Add WhatsApp integration
   - Export inquiries to Excel
   - Add SMS notifications

---

## ❓ Troubleshooting

**Problem:** Admin panel shows "Failed to load inquiries"
**Solution:** Make sure backend server is running (`cd server && npm start`)

**Problem:** Inquiries not saving
**Solution:** Check that `server/data/` folder exists and is writable

**Problem:** Can't start server on port 5000
**Solution:** Another program is using port 5000. Change PORT in `server/server.js`

---

## 💡 Tips

- Keep both terminals open while working
- Check `server/data/inquiries.json` to verify data is being saved
- Use the admin panel status feature to track which customers you've called
- The admin panel auto-refreshes when you click "Refresh" button

---

Enjoy your new e-commerce backend! 🎉
