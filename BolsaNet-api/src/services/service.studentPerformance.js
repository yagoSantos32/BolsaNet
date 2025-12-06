import studentPerformanceRepository from '../repositories/repository.studentPerformance.js';
import serviceBenefitPeriod from '../services/service.benefitPeriod.js';

async function RegisterStudentPerformance(data) {
    // ✅ PARSE IMEDIATO
    const parsedUsersId = parseInt(data.usersId);
    const parsedAverage = parseFloat(data.studentAverage);
    const yearMonth = data.yearMonth;
    const metGoal = data.metGoal;
    
    console.log('📥 Frontend data:', data);
    console.log('🔢 Parsed data:', { parsedUsersId, yearMonth, parsedAverage, metGoal });
    
    // ✅ VALIDAÇÃO com NUMBERS
    if (!parsedUsersId || !yearMonth || isNaN(parsedAverage) || metGoal === undefined) {
        throw new Error('Todos os campos são obrigatórios e devem ser números válidos');
    }
    
    if (parsedAverage < 0 || parsedAverage > 10) {
        throw new Error('Média deve estar entre 0 e 10');
    }
    
    // ✅ USA NUMBERS no repository
    const existing = await studentPerformanceRepository.GetByCompositeKey(parsedUsersId, yearMonth);
    if (existing) { // ✅ Remove .length - aceita objeto ou array
        throw new Error(`Registro já existe para usuário ${parsedUsersId} e mês ${yearMonth}`);
    }
    
    // 1. REGISTRA com NUMBERS
    const studentPerf = await studentPerformanceRepository.RegisterStudentPerformance(
        parsedUsersId, yearMonth, parsedAverage, metGoal
    );
    
    // 2. CALCULA megas
    const yearMonthList = await serviceBenefitPeriod.ListBenefitPeriod({ yearMonth });
    let megasGranted = 0;
    
    if (yearMonthList && yearMonthList.length > 0) {
        const config = yearMonthList[0];
        const baseMegas = parseInt(config.baseMegas) || 500;
        const megasPerPoint = parseInt(config.megasPerPoint) || 50;
        
        if (metGoal) {
            megasGranted = baseMegas + (parsedAverage * megasPerPoint);
        }
        
        console.log(`📊 Cálculo: média=${parsedAverage} baseMegas=${baseMegas} megasPerPoint=${megasPerPoint} total=${megasGranted}`);
        
        // 3. REGISTRA megashistory
        await studentPerformanceRepository.RegisterMegaHistory(
            parsedUsersId, yearMonth, megasGranted, parsedAverage
        );
    }
    
    return {
        success: true,
        studentPerformance: studentPerf,
        megashistory: { megasGranted }
    };
}

async function UpdateStudentPerformance(usersId, yearMonth, data) {
    const parsedUsersId = parseInt(usersId);
    const parsedAverage = parseFloat(data.studentAverage);
    
    const existing = await studentPerformanceRepository.GetByCompositeKey(parsedUsersId, yearMonth);
    if (!existing) {
        throw new Error('Registro não encontrado');
    }
    
    if (!isNaN(parsedAverage) && (parsedAverage < 0 || parsedAverage > 10)) {
        throw new Error('Média deve estar entre 0 e 10');
    }
    
    const updatedPerf = await studentPerformanceRepository.UpdateStudentPerformance(
        parsedUsersId, yearMonth, parsedAverage, data.metGoal
    );
    
    // AUTO-ATUALIZA megashistory (igual Register)
    const yearMonthList = await serviceBenefitPeriod.ListBenefitPeriod({ yearMonth });
    if (yearMonthList && yearMonthList.length > 0) {
        const config = yearMonthList[0];
        const baseMegas = parseInt(config.baseMegas) || 500;
        const megasPerPoint = parseInt(config.megasPerPoint) || 50;
        
        let megasGranted = 0;
        if (data.metGoal) {
            megasGranted = baseMegas + (parsedAverage * megasPerPoint);
        }
        
        await studentPerformanceRepository.RegisterMegaHistory(parsedUsersId, yearMonth, megasGranted, parsedAverage);
    }
    
    return updatedPerf;
}

async function ListStudentPerformance(filters = {}) {
    return await studentPerformanceRepository.List(filters);
}

async function GetStudentPerformanceByUser(usersId) {
    const parsedUserId = parseInt(usersId);
    if (!parsedUserId || isNaN(parsedUserId) || parsedUserId <= 0) {
        throw new Error('ID de usuário inválido: ' + usersId);
    }
    
    return await studentPerformanceRepository.ListByUser(parsedUserId);
}

export default {
    RegisterStudentPerformance,
    UpdateStudentPerformance,
    ListStudentPerformance,
    GetStudentPerformanceByUser
};
