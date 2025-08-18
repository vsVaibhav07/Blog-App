import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";


export const createBlog = async (req, res) => {
  try {
    if (!req.files || !req.files.blogImage) {
      return res.status(400).json({ message: "Blog image is required." });
    }

    const { blogImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid image format. Only JPEG, PNG, and WEBP are allowed.",
      });
    }

    const { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res.status(400).json({
        message: "Title, category and about fields are required.",
      });
    }

    const adminName = req?.user?.name || "Admin";
    const adminPhoto = req?.user?.photo?.url || "";
    const createdBy = req?.user?._id;

    const result = await cloudinary.uploader.upload(blogImage.tempFilePath, {
      folder: "blogs",
    });

    if (!result || result.error) {
      return res.status(500).json({ message: "Image upload failed." });
    }

    const newBlog = await Blog.create({
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: result.public_id,
        url: result.url,
      },
    });

    return res.status(201).json({
      message: "Blog created successfully.",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};


export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID." });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    if (blog.blogImage?.public_id) {
      await cloudinary.uploader.destroy(blog.blogImage.public_id);
    }

    await blog.deleteOne();
    return res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

// GET all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json(allBlogs);
  } catch (error) {
    console.error("Get All Blogs Error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};


export const getSingleBlogs = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID." });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.error("Get Single Blog Error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getMyBlogs = async (req, res) => {
  try {
    const createdBy = req?.user?._id;
    if (!createdBy) {
      return res.status(401).json({ message: "Unauthorized: No user ID found." });
    }

    const myBlogs = await Blog.find({ createdBy }).sort({ createdAt: -1 });
    return res.status(200).json(myBlogs);
  } catch (error) {
    console.error("Get My Blogs Error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Blog ID." });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    const { title, about, category } = req.body;
    let blogImage = blog.blogImage;

    if (req.files && req.files.blogImage) {
      const file = req.files.blogImage;
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedFormats.includes(file.mimetype)) {
        return res.status(400).json({
          message: "Invalid image format. Only JPEG, PNG, and WEBP are allowed.",
        });
      }

      if (blogImage?.public_id) {
        await cloudinary.uploader.destroy(blogImage.public_id);
      }

      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogs",
      });

      if (!result || result.error) {
        return res.status(500).json({ message: "Image upload failed." });
      }

      blogImage = {
        public_id: result.public_id,
        url: result.url,
      };
    }

    blog.title = title || blog.title;
    blog.about = about || blog.about;
    blog.category = category || blog.category;
    blog.blogImage = blogImage;

    await blog.save();

    return res.status(200).json({
      message: "Blog updated successfully.",
      blog,
    });
  } catch (error) {
    console.error("Update Blog Error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
