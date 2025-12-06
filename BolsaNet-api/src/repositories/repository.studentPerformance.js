import { execute } from "../database/conn.js";

async function RegisterStudentPerformance(idusers, yearMonth, studentAverage, metGoal) {
    let sql = `INSERT INTO studentperformance (
        idusers, yearMonth, studentAverage, metGoal
    ) VALUES (
        ?, ?, ?, ?
    )
    ON DUPLICATE KEY UPDATE
        studentAverage = VALUES(studentAverage),
        metGoal = VALUES(metGoal);
    SELECT * FROM studentperformance WHERE idusers = ? AND yearMonth = ?`;
    
    const registerPerformance = await execute(sql, [
        idusers, yearMonth, studentAverage, metGoal, 
        idusers, yearMonth
    ]);
    return registerPerformance[1][0];
}

// ✅ NOVO: Auto-registra megashistory
async function RegisterMegaHistory(idusers, yearMonth, megasGranted, studentAverage) {
    const sql = `INSERT INTO megashistory (
        idusers, yearMonth, megasGranted, studentAverage
    ) VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        megasGranted = VALUES(megasGranted),
        studentAverage = VALUES(studentAverage)`;
    
    return await execute(sql, [idusers, yearMonth, megasGranted, studentAverage]);
}

// resto das funções iguais...
async function UpdateStudentPerformance(idusers, yearMonth, studentAverage, metGoal) {
    let sql = `
        UPDATE studentperformance
        SET studentAverage = ?, metGoal = ?
        WHERE idusers = ? AND yearMonth = ?
    `;
    return await execute(sql, [studentAverage, metGoal, idusers, yearMonth]);
}

async function GetByCompositeKey(idusers, yearMonth) {
    let sql = `SELECT * FROM studentperformance WHERE idusers = ? AND yearMonth = ?`;
    const result = await execute(sql, [idusers, yearMonth]);
    return result[0];
}

async function List(filters = {}) {
    let sql = `
        SELECT sp.*, u.fullName, u.email, mh.megasGranted
        FROM studentperformance sp
        LEFT JOIN users u ON sp.idusers = u.iduser
        LEFT JOIN megashistory mh ON sp.idusers = mh.idusers AND sp.yearMonth = mh.yearMonth
    `;
    const params = [];
    
    if (Object.keys(filters).length > 0) {
        const conditions = Object.entries(filters).map(([field, value]) => {
            params.push(value);
            return `sp.${field} = ?`;
        });
        sql += ` WHERE ` + conditions.join(' AND ');
    }
    
    sql += ` ORDER BY sp.yearMonth DESC, sp.idusers DESC`;
    
    console.log('🔍 SQL:', sql);
    console.log('📊 Params:', params);
    
    const performances = await execute(sql, params);
    return performances[0];
}

async function ListByUser(idusers) {
    let sql = `
        SELECT sp.*, u.fullName, u.email, mh.megasGranted
        FROM studentperformance sp
        LEFT JOIN users u ON sp.idusers = u.iduser
        LEFT JOIN megashistory mh ON sp.idusers = mh.idusers AND sp.yearMonth = mh.yearMonth
        WHERE sp.idusers = ?
        ORDER BY sp.id DESC
    `;
    const performances = await execute(sql, [idusers]);
    return performances[0];
}

export default { 
    RegisterStudentPerformance, 
    RegisterMegaHistory,  // ✅ NOVO
    UpdateStudentPerformance, 
    GetByCompositeKey, 
    List, 
    ListByUser 
};
