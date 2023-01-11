// Require express
const express = require("express");
// Initialize express
const app = express();
const PORT = 8080;

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

module.exports = allowCors(handler)
// parse JSON
app.use(express.json());
// parse URL encoded data
app.use(express.urlencoded({ extended: true }));

app.get('/calculate', (req, res) => {
    return res.status(200).json({
             message: "Welcome to the Calculator API. Please POST your inputs",
           });
});

app.post('/calculate', (req, res) => {
       // Performs a calculation
    // Check if request body is empty
if (!Object.keys(req.body).length) {
       return res.status(400).json({
         message: "Request body cannot be empty",
       });
    }
    // get income, liabilities and deposit
    const multiplier = 5;
    const { total_income, total_liabilities, deposit } = req.body;
    if (!total_income || !total_liabilities || !deposit) {
           res.status(400).json({
             message: "Ensure you have provided income, liabilities and deposit",
           });
    }
    try {
        var borrowing = total_income * multiplier - total_liabilities;
        // note: + 10000 is a deliberate error 
        var property = borrowing + deposit + 10000;
        
        const result = {
            borrowing: borrowing,
            property: property
            };

           res.status(200).json({
            result
             });
         } catch (error) {
           res.status(500).json({
               message: "Failed to perform calculation",
             });
         }
    });
// create a server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
// Export the Express API
module.exports = app;
