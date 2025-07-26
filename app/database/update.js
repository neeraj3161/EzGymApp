const updateMember = async (member) => {
  const db = await getDBConnection();

  const {
    id, // required for update
    name,
    age,
    phone,
    emergency_phone,
    medical_records,
    plan_id,
    start_date,
    end_date,
    personal_training,
    modified_by = 0
  } = member;

  await db.executeSql(
    `UPDATE members SET
      name = ?, 
      age = ?, 
      phone = ?, 
      emergency_phone = ?, 
      medical_records = ?, 
      plan_id = ?, 
      start_date = ?, 
      end_date = ?, 
      personal_training = ?, 
      modified_at = datetime('now'),
      modified_by = ?
    WHERE id = ?`,
    [
      name,
      age,
      phone,
      emergency_phone,
      medical_records,
      plan_id,
      start_date,
      end_date,
      personal_training,
      modified_by,
      id
    ]
  );
};
