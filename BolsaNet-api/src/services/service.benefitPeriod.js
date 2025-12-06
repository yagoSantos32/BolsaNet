import repositoryBenefitPeriod from "../repositories/repository.benefitPeriod.js"

async function RegisterBenefitPeriod(benefitPeriodData) {
    const { yearMonth, minimumAverage, baseMegas, megasPerPoint } = benefitPeriodData

    const existing = await repositoryBenefitPeriod.FindByYearMonth(yearMonth);
    if (existing) {
        throw new Error(`Já existe um benefício definido para o mês ${yearMonth}`);
    }
    const benefitPeriod = await repositoryBenefitPeriod.RegisterBenefitPeriod(yearMonth, minimumAverage, baseMegas, megasPerPoint);
    return benefitPeriod
}

async function ListBenefitPeriod(filters) {
  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value)
  );

  const benefits = await repositoryBenefitPeriod.ListBenefitPeriod(validFilters);
  return benefits;
}






export default { RegisterBenefitPeriod,ListBenefitPeriod }