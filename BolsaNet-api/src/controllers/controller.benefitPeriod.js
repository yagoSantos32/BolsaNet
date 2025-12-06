import serviceBenefitPeriod from "../services/service.benefitPeriod.js"
async function RegisterBenefitPeriod(req, res) {
    try {
        const benefitPeriodData = {
            yearMonth:new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            ...req.body
        }
        const benefitPeriod = await serviceBenefitPeriod.RegisterBenefitPeriod(benefitPeriodData)
        return res.status(201).json(benefitPeriod)
    } catch (error) {
        if (error.message.includes("Já existe")) {
            return res.status(409).json({ error: error.message });
        }

        return res.status(500).json({ error: "erro ao registrar o beneficio", message: error.message })
    }
}

async function ListBenefitPeriod(req, res) {
    try {
        const benefits = await serviceBenefitPeriod.ListBenefitPeriod(req.query);
        return res.status(200).json(benefits);
    } catch (err) {
        return res.status(500).json({ error: "erro ao listar benefícios", message:err.message});
    }
}



export default { RegisterBenefitPeriod, ListBenefitPeriod }