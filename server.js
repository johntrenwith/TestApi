// Require express
const express = require("express");
var cors = require('cors')
// Initialize express
const app = express();
const PORT = 8080;




// parse JSON
app.use(express.json());
app.use(cors())
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
    if (!total_income || total_liabilities.length == 0 || !deposit) {
           res.status(400).json({
             message: "Ensure you have provided income, liabilities and deposit",
           });
    }
    try {
        var borrowing = total_income * multiplier - total_liabilities;        
        var property = borrowing + deposit;
        
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
