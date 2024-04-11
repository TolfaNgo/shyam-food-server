const { Blogs } = require("./model/blogs.model");

// Controller function to get all blog entries
async function getBlogs(req, res) {
  try {
    const blogs = await Blogs.findAll({
      attributes: { exclude: ["updatedAt"] }, // Remove "createdAt" from exclusion list
    });

    const blogsWithParsedImages = blogs.map((blog) => {
      return {
        ...blog.toJSON(),
        image: JSON.parse(blog.image),
      };
    });

    return res.status(200).json({ blogs: blogsWithParsedImages });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function to create a new Blog entry
async function createBlog(req, res) {
  try {
    const { title, description, images, video_link, active, created_by } =
      req.body;

    const blog = await Blogs.create({
      title,
      description,
      image: images,
      video_link,
      active,
      created_by,
    });

    return res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error("Error creating Blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function to update a Blog entry by ID
async function updateBlogById(req, res) {
  try {
    const blogId = req.params.id;
    let blog = await Blogs.findByPk(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update Blog entry with the fields provided in the request body
    await Blogs.update(req.body, { where: { id: blogId } });

    return res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Error updating Blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Controller function to remove a Blog entry by ID
async function removeBlogById(req, res) {
  try {
    const blogId = req.params.id;
    const deletedCount = await Blogs.destroy({ where: { id: blogId } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error removing Blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createBlog, updateBlogById, getBlogs, removeBlogById };
