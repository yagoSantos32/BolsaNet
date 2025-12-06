
import studentPerformanceService from '../services/service.studentPerformance.js';

async function RegisterStudentPerformance(req, res) {
    try {
        const result = await studentPerformanceService.RegisterStudentPerformance(req.body);
        res.status(201).json({
            success: true,
            data: result  
        });
    } catch (error) {
        console.error('Erro no controller Register:', error.message);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

 async function UpdateStudentPerformance(req, res) {
    try {
        const { idusers, yearMonth } = req.params;
        const result = await studentPerformanceService.UpdateStudentPerformance(idusers, yearMonth, req.body);
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Erro no controller Update:', error.message);
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
}

 async function ListStudentPerformance(req, res) {
    try {
        const result = await studentPerformanceService.ListStudentPerformance(req.query);
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Erro no controller List:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

 async function GetStudentPerformanceByUser(req, res) {
    try {
        const { idusers } = req.params;
        const result = await studentPerformanceService.GetStudentPerformanceByUser(idusers);
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Erro no controller GetByUser:', error.message);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

export default {RegisterStudentPerformance,UpdateStudentPerformance,ListStudentPerformance,GetStudentPerformanceByUser}