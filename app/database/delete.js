import { getDBConnection } from './db';

export const deleteAllTableData = async () => {
  const db = await getDBConnection();

  try {
    await db.transaction(async tx => {
      await tx.executeSql('DELETE FROM attendance');
      await tx.executeSql('DELETE FROM payments');
      await tx.executeSql('DELETE FROM members');
      await tx.executeSql('DELETE FROM plans');
    });

    console.log('✅ All table data deleted successfully.');
  } catch (error) {
    console.error('❌ Error deleting data from tables:', error);
    throw error;
  }
};



export const dropAllTables = async () => {
  const db = await getDBConnection();

  try {
    await db.transaction(async tx => {
      await tx.executeSql('DROP TABLE IF EXISTS attendance');
      await tx.executeSql('DROP TABLE IF EXISTS payments');
      await tx.executeSql('DROP TABLE IF EXISTS members');
      await tx.executeSql('DROP TABLE IF EXISTS plans');
    });

    console.log('✅ All tables dropped successfully.');
  } catch (error) {
    console.error('❌ Error dropping tables:', error);
    throw error;
  }
};

