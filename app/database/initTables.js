import { getDBConnection } from './db';

export const initTables = async () => {
  const db = await getDBConnection();

  await db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        phone TEXT UNIQUE NOT NULL,
        emergency_phone TEXT,
        medical_records TEXT,
        plan TEXT,
        start_date TEXT,
        end_date TEXT,
        personal_training INTEGER,

        created_at TEXT DEFAULT (datetime('now')),
        modified_at TEXT DEFAULT (datetime('now')),
        created_by INTEGER DEFAULT 0,
        modified_by INTEGER DEFAULT 0
      )
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        duration INTEGER, -- days
        price REAL,

        created_at TEXT DEFAULT (datetime('now')),
        modified_at TEXT DEFAULT (datetime('now')),
        created_by INTEGER DEFAULT 0,
        modified_by INTEGER DEFAULT 0
      )
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        member_id INTEGER,
        amount REAL,
        payment_date TEXT,

        created_at TEXT DEFAULT (datetime('now')),
        modified_at TEXT DEFAULT (datetime('now')),
        created_by INTEGER DEFAULT 0,
        modified_by INTEGER DEFAULT 0,

        FOREIGN KEY (member_id) REFERENCES members(id)
      )
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        member_id INTEGER,
        date TEXT,

        created_at TEXT DEFAULT (datetime('now')),
        modified_at TEXT DEFAULT (datetime('now')),
        created_by INTEGER DEFAULT 0,
        modified_by INTEGER DEFAULT 0,

        FOREIGN KEY (member_id) REFERENCES members(id)
      )
    `);
  });
};
