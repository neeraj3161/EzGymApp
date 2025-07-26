import { getDBConnection } from "./db";



export const getAllMembers = async () => {
  const db = await getDBConnectionection();

  try {
    const results = await db.executeSql('SELECT * FROM members');
    const rows = results[0].rows;
    const members = [];

    for (let i = 0; i < rows.length; i++) {
      members.push(rows.item(i));
    }

    return members;
  } catch (error) {
    console.error('❌ Failed to fetch members:', error);
    throw error;
  }
};


export const getAllPlans = async () => {
  const db = await getDBConnection();

  try {
    const results = await db.executeSql('SELECT * FROM plans');
    const rows = results[0].rows;
    const plans = [];

    for (let i = 0; i < rows.length; i++) {
      plans.push(rows.item(i));
    }

    return plans;
  } catch (error) {
    console.error('❌ Failed to fetch plans:', error);
    throw error;
  }
};

