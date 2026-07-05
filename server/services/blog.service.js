import db from '../database.js';
import cache from '../utils/cache.js';

class BlogService {
  getBlogs() {
    const cacheKey = 'blogs_all';
    let blogs = cache.get(cacheKey);

    if (!blogs) {
      blogs = db.prepare('SELECT * FROM blog ORDER BY id DESC').all();
      cache.set(cacheKey, blogs, 3600); // Cache for 1 hour
    }

    return blogs;
  }

  createBlog(data, creatorUserId) {
    const { title, excerpt, content, author, date, category, image } = data;
    
    const result = db.prepare(
      'INSERT INTO blog (title, excerpt, content, author, date, category, image) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(title, excerpt, content, author, date, category, image);
    
    db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)')
      .run(creatorUserId, 'CREATE', 'blog', result.lastInsertRowid, `Blog yazısı eklendi: ${title}`);
    
    const newBlog = db.prepare('SELECT * FROM blog WHERE id = ?').get(result.lastInsertRowid);
    
    // Invalidate cache
    cache.delete('blogs_all');
    
    return newBlog;
  }

  deleteBlog(id, deleterUserId) {
    db.prepare('DELETE FROM blog WHERE id = ?').run(id);
    
    db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)')
      .run(deleterUserId, 'DELETE', 'blog', id, 'Blog yazısı silindi');
    
    // Invalidate cache
    cache.delete('blogs_all');
    
    return { success: true };
  }
}

export default new BlogService();
