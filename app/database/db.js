// db.js
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);
let dbInstance = null;

// Singleton connection
export const getDBConnection = async () => {
  if (dbInstance) return dbInstance;

  dbInstance = await SQLite.openDatabase({
    name: 'gym.db',
    location: 'default',
  });

  return dbInstance;
};
