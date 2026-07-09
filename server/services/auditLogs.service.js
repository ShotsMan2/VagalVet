import db from '../database.js';

class AuditLogService {
  getLogs(page = 1, limit = 50, action, entity) {
    let query = 'SELECT * FROM audit_logs WHERE 1=1';
    const params = [];

    if (action) {
      query += ' AND action = ?';
      params.push(action);
    }
    if (entity) {
      query += ' AND entity = ?';
      params.push(entity);
    }

    // Count total for pagination metadata
    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');
    const total = db.prepare(countQuery).get(...params).total;

    // Add pagination
    const offset = (page - 1) * limit;
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const logs = db.prepare(query).all(...params);

    return {
      data: logs,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

export default new AuditLogService();
