// Require express
const express = require("express");
// Initialize express
const app = express();
const PORT = 8080;
// parse JSON
app.use(express.json());
// parse URL encoded data
app.use(express.urlencoded({ extended: true }));
// create a server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
// Export the Express API
module.exports = app;

app.post('/calculate', (req, res) => {
       // Performs a calculation
    // Check if request body is empty
if (!Object.keys(req.body).length) {
       return res.status(400).json({
         message: "Request body cannot be empty",
       });
    }
    // get income, liabilities and deposit
    const { total_income, total_liabilities, deposit } = req.body;
    if (!total_income || !total_liabilities || !deposit) {
           res.status(400).json({
             message: "Ensure you have provided income, liabilities and deposit",
           });
    }
    try {
        var borrowing = (total_income - total_liabilities) * 4;
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