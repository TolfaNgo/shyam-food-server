const { Products, Unit } = require("./model/products.model");

// Controller function to get all product entries with relevant units
async function getProducts(req, res) {
  try {
    const { is_special, is_popular } = req.params;
    // Fetch all product entries from the database
    let products;
    if (is_special || is_popular) {
      products = await Products.findAll({
        include: [
          {
            model: Unit,
            where: { is_special: is_special, is_popular: is_popular },
            attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude timestamps to prevent circular references
          },
        ], // Include the Unit model to fetch relevant units
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude timestamps to prevent circular references
      });
    } else {
      products = await Products.findAll({
        include: [
          {
            model: Unit,
            attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude timestamps to prevent circular references
          },
        ], // Include the Unit model to fetch relevant units
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude timestamps to prevent circular references
      });
    }

    const productsWithParsedImages = products.map((product) => {
      return {
        ...product.toJSON(),
        images: JSON.parse(product.images),
      };
    });

    // Send success response with the fetched products
    return res.status(200).json({ products: productsWithParsedImages });
  } catch (error) {
    console.error("Error fetching products:", error);
    // Send error response
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function to create a new Product entry along with associated Units
async function createProduct(req, res) {
  try {
    // Extract product details from request body
    const { title, description, images, active, is_popular, is_special } =
      req.body;

    // Create Product entry
    const product = await Products.create({
      title,
      description,
      images,
      active,
      is_popular,
      is_special,
    });

    // Extract unit details from request body
    const { units } = req.body;
    let unitsValue = JSON.parse(units);
    // If units are provided, create associated Unit entries
    if (unitsValue && unitsValue.length > 0) {
      await Promise.all(
        unitsValue.map(async (unit) => {
          await Unit.create({
            product_id: product.id,
            unit: unit.unit,
            price: unit.price,
          });
        })
      );
    }

    // Send success response
    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating Product:", error);
    // Send error response
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function to update a Product entry and associated Units by ID
async function updateProductById(req, res) {
  try {
    const productId = req.params.id; // Assuming ID is passed in the URL params

    // Find the Product entry by ID
    let product = await Products.findByPk(productId);

    // If Product entry does not exist, return 404 Not Found
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Extract unit details from request body
    const { units } = req.body;
    let parsedUnits;
    if (units) {
      parsedUnits = JSON.parse(units);
    }
    // If units are provided, update associated Unit entries
    if (parsedUnits && parsedUnits.length > 0) {
      // Update existing units and create new units
      await Promise.all(
        parsedUnits.map(async (unit) => {
          if (unit.id) {
            // If unit has an ID, it already exists, update it
            const existingUnit = await Unit.findByPk(unit.id);
            if (existingUnit) {
              await existingUnit.update({ unit: unit.unit, price: unit.price });
            }
          } else {
            // If unit does not have an ID, it's a new unit, create it
            await Unit.create({
              product_id: productId,
              unit: unit.unit,
              price: unit.price,
            });
          }
        })
      );
    }
    if (!req.noFilesWereAdded) {
      let prevImages = JSON.parse(product.images);
      let current = JSON.parse(req.body.images ?? []);
      let mergeImages = [...prevImages, ...current];
      req.body.images = JSON.stringify([]);
      req.body.images = JSON.stringify(mergeImages);
    }
    // Update Product entry with the fields provided in the request body
    await Products.update(req.body, { where: { id: productId } });

    // Send success response
    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating Product:", error);
    // Send error response
    return res.status(500).json({ message: "Internal server error" });
  }
}

const removeUnit = async (req, res) => {
  try {
    const productId = req.params.id;
    let { id } = req.body;

    let units = await Unit.destroy({
      where: { id: id, product_id: productId },
    });
    return res
      .status(200)
      .json({ message: "Unit deleted successfully", units });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createProduct, updateProductById, getProducts, removeUnit };
