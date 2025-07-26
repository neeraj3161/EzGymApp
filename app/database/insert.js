import { getDBConnection } from "./db";

const insertMember = async (member) => {
  const db = await getDBConnection();

  const {
    name,
    age,
    phone,
    emergency_phone,
    medical_records,
    plan_id,
    dob,
    start_date,
    end_date,
    personal_training,
    created_by = 0,
    modified_by = 0
  } = member;

  await db.executeSql(
    `INSERT INTO members 
    (name, age, phone, emergency_phone, medical_records, plan_id, dob, start_date, end_date, personal_training, created_by, modified_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      age,
      phone,
      emergency_phone,
      medical_records,
      plan_id,
      dob,
      start_date,
      end_date,
      personal_training,
      created_by,
      modified_by
    ]
  );
};




export const insertPlan = async ({
  name,
  duration,
  price,
  member_id = 0
}) => {
  const db = await getDBConnection();
  try {
    const [result] = await db.executeSql(
      'SELECT id FROM plans WHERE name = ?',
      [name]
    );

    if (result.rows.length > 0) {
      const error = new Error(`Plan with name "${name}" already exists`);
      error.code = -1; // custom error code
      throw error;
    }

    await db.executeSql(
      `INSERT INTO plans (name, duration, price, member_id)
       VALUES (?, ?, ?, ?)`,
      [name, duration, price, member_id]
    );

    console.log('✅ Plan inserted successfully');
  } catch (err) {
    console.error('❌ Failed to insert plan:', err.message);
    throw err;
  }
};



const insertDefaultPlans = async () => {
  const db = await getDBConnection();

  const defaultPlans = [
    { name: '1 Month', duration: 30, price: 1000, days: 30},
    { name: '3 Months', duration: 90, price: 2700, days: 90 },
    { name: '6 Months', duration: 180, price: 5000, days: 180 },
    { name: '12 Months', duration: 365, price: 9000, days: 365 }
  ];

  for (const plan of defaultPlans) {
    const [result] = await db.executeSql(
      'SELECT id FROM plans WHERE name = ?',
      [plan.name]
    );

    if (result.rows.length === 0) {
      await db.executeSql(
        `INSERT INTO plans (name, duration, price, days) VALUES (?, ?, ?, ?)`,
        [plan.name, plan.duration, plan.price, plan.days]
      );
    }
  }
};


export { insertMember, insertDefaultPlans };