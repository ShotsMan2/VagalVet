import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createBlogSchema } from '../validations/blog.validation.js';
import blogService from '../services/blog.service.js';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(async (req, res) => {
  const blogs = blogService.getBlogs();
  res.json(blogs);
}));

router.post('/', authMiddleware, requireRole('admin'), validate(createBlogSchema), expressAsyncHandler(async (req, res) => {
  const result = blogService.createBlog(req.body, req.user.userId);
  res.json(result);
}));

router.delete('/:id', authMiddleware, requireRole('admin'), expressAsyncHandler(async (req, res) => {
  const result = blogService.deleteBlog(req.params.id, req.user.userId);
  res.json(result);
}));

export default router;
