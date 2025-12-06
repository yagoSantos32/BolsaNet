import { execute } from "../database/conn.js";
async function RegisterBenefitPeriod(yearMonth, minimumAverage, baseMegas, megasPerPoint) {

  const sqlInsert = `
    INSERT INTO yearmonth (yearMonth, minimumAverage, baseMegas, megasPerPoint)
    VALUES (?, ?, ?, ?)
  `;
  await execute(sqlInsert, [yearMonth, minimumAverage, baseMegas, megasPerPoint]);


  const sqlSelect = `
    SELECT yearMonth, minimumAverage, baseMegas, megasPerPoint
    FROM yearmonth
    WHERE yearMonth = ?
    LIMIT 1
  `;
  const rows = await execute(sqlSelect, [yearMonth]);
  return rows.length > 0 ? rows[0] : null;
}


async function FindByYearMonth(yearMonth) {
  let sql = `SELECT * FROM yearmonth WHERE yearMonth = ?
            LIMIT 1; `
  const rows = await execute(sql, [yearMonth]);
  return rows.length > 0 ? rows[0] : null;
}

async function ListBenefitPeriod(filters) {
  let sql = `SELECT * FROM yearmonth`;
  const params = [];

  const conditions = Object.entries(filters).map(([field, value]) => {
    params.push(value);
    return `${field} = ?`;
  });

  if (conditions.length > 0) {
    sql += ` WHERE ` + conditions.join(' AND ');
  }

  
  console.log(sql);
  const benefits = await execute(sql, params);
  console.log(benefits)
  return benefits;
}


export default { RegisterBenefitPeriod, FindByYearMonth,ListBenefitPeriod }