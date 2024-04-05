const { Currency } = require("./model/currency.model");

// Controller function to get all currency entries
async function getCurrencies(req, res) {
  try {
    // Fetch all currency entries from the database
    const currencies = await Currency.findAll();

    // Send success response with the fetched currencies
    return res.status(200).json({ currencies });
  } catch (error) {
    console.error("Error fetching currencies:", error);
    // Send error response
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function to create a new Currency entry
async function createCurrency(req, res) {
  try {
    // Extract currency details from request body
    const { name, symbol, price } = req.body;

    // Create Currency entry
    const currency = await Currency.create({ name, symbol, price });

    // Send success response
    return res
      .status(201)
      .json({ message: "Currency created successfully", currency });
  } catch (error) {
    console.error("Error creating Currency:", error);
    // Send error response
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function to update a Currency entry by ID
async function updateCurrencyById(req, res) {
  try {
    const currencyId = req.params.id; // Assuming ID is passed in the URL params

    // Find the Currency entry by ID
    let currency = await Currency.findByPk(currencyId);

    // If Currency entry does not exist, return 404 Not Found
    if (!currency) {
      return res.status(404).json({ message: "Currency not found" });
    }

    // Update Currency entry with the fields provided in the request body
    currency = await currency.update(req.body);

    // Send success response
    return res
      .status(200)
      .json({ message: "Currency updated successfully", currency });
  } catch (error) {
    console.error("Error updating Currency:", error);
    // Send error response
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createCurrency, updateCurrencyById, getCurrencies };
