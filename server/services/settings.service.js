import db from '../database.js';
import cache from '../utils/cache.js';
import { AppError } from '../utils/AppError.js';

class SettingsService {
  getSettings() {
    const cacheKey = 'app_settings';
    let settings = cache.get(cacheKey);

    if (!settings) {
      const settingsRows = db.prepare('SELECT * FROM settings').all();
      settings = {};
      settingsRows.forEach(row => { settings[row.key] = row.value; });
      cache.set(cacheKey, settings, 86400); // Cache for 24 hours
    }

    return settings;
  }

  updateSettings(settingsData, updaterUserId) {
    if (!settingsData || typeof settingsData !== 'object') {
      throw new AppError('Geçersiz ayarlar verisi', 400);
    }

    const insert = db.prepare('INSERT INTO settings (key, value) VALUES (@key, @value) ON CONFLICT(key) DO UPDATE SET value = @value');
    
    const insertMany = db.transaction((settingsObj) => {
      for (const [key, value] of Object.entries(settingsObj)) {
        if (value !== null && value !== undefined) {
          insert.run({ key, value: String(value) });
        }
      }
    });

    insertMany(settingsData);
    
    db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)')
      .run(updaterUserId, 'UPDATE', 'settings', null, 'Genel ayarlar güncellendi');

    cache.delete('app_settings');
    
    return { success: true };
  }
}

export default new SettingsService();
