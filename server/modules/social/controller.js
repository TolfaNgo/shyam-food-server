const { SocialInfo } = require("./model/social.model");

// Controller function to create a new SocialInfo entry
async function createSocialInfo(req, res) {
  try {
    // Extract social info details from request body
    const {
      facebook_link,
      instagram_link,
      twitter_link,
      contact_no,
      contact_email,
    } = req.body;

    // Create SocialInfo entry
    const socialInfo = await SocialInfo.create({
      facebook_link,
      instagram_link,
      twitter_link,
      contact_no,
      contact_email,
    });

    // Send success response
    return res
      .status(201)
      .json({ message: "SocialInfo created successfully", socialInfo });
  } catch (error) {
    console.error("Error creating SocialInfo:", error);
    // Send error response
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function to update a SocialInfo entry by ID
async function updateSocialInfoById(req, res) {
  try {
    const socialInfoId = req.params.id; // Assuming ID is passed in the URL params

    // Find the SocialInfo entry by ID
    let socialInfo = await SocialInfo.findByPk(socialInfoId);

    // If SocialInfo entry does not exist, return 404 Not Found
    if (!socialInfo) {
      return res.status(404).json({ message: "SocialInfo not found" });
    }

    // Update SocialInfo entry with the fields provided in the request body
    socialInfo = await socialInfo.update(req.body);

    // Send success response
    return res
      .status(200)
      .json({ message: "SocialInfo updated successfully", socialInfo });
  } catch (error) {
    console.error("Error updating SocialInfo:", error);
    // Send error response
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createSocialInfo, updateSocialInfoById };
