export function checkAdd (varName, currentProject) {
    // услуги
  if ((varName === 'RevenuesService' || varName === 'CostOfGoodsService' || varName === 'MarginService' || varName === 'GrossProfitService' || varName === 'SpeedOfTurnoverService' || varName === 'ProfitabilityOfSalesService') && currentProject.ActivityService) {
    return true
  } else if ((varName === 'RevenuesService' || varName === 'CostOfGoodsService' || varName === 'MarginService' || varName === 'GrossProfitService' || varName === 'SpeedOfTurnoverService' || varName === 'ProfitabilityOfSalesService') && !currentProject.ActivityService) {
    return false
  }

  if ((varName === 'RevenuesTrade' || varName === 'CostOfGoodsTrade' || varName === 'MarginTrade' || varName === 'GrossProfitTrade' || varName === 'SpeedOfTurnoverTrade' || varName === 'ProfitabilityOfSalesTrade') && currentProject.ActivityTrade) {
    return true
  } else if ((varName === 'RevenuesTrade' || varName === 'CostOfGoodsTrade' || varName === 'MarginTrade' || varName === 'GrossProfitTrade' || varName === 'SpeedOfTurnoverTrade' || varName === 'ProfitabilityOfSalesTrade') && !currentProject.ActivityTrade) {
    return false
  }

  if ((varName === 'RevenuesAgriculture' || varName === 'CostOfGoodsAgriculture' || varName === 'MarginAgriculture' || varName === 'GrossProfitAgriculture' || varName === 'SpeedOfTurnoverAgriculture' || varName === 'ProfitabilityOfSalesAgriculture') && currentProject.ActivityAgriculture) {
    return true
  } else if ((varName === 'RevenuesAgriculture' || varName === 'CostOfGoodsAgriculture' || varName === 'MarginAgriculture' || varName === 'GrossProfitAgriculture' || varName === 'SpeedOfTurnoverAgriculture' || varName === 'ProfitabilityOfSalesAgriculture') && !currentProject.ActivityAgriculture) {
    return false
  }

  if ((varName === 'RevenuesProduction' || varName === 'CostOfGoodsProduction' || varName === 'MarginProduction' || varName === 'GrossProfitProduction' || varName === 'SpeedOfTurnoverProduction' || varName === 'ProfitabilityOfSalesProduction') && currentProject.ActivityProduction) {
    return true
  } else if ((varName === 'RevenuesProduction' || varName === 'CostOfGoodsProduction' || varName === 'MarginProduction' || varName === 'GrossProfitProduction' || varName === 'SpeedOfTurnoverProduction' || varName === 'ProfitabilityOfSalesProduction') && !currentProject.ActivityProduction) {
    return false
  }

  return true
}

export function initLine (title, varName) {
  var calc = false
  if (varName.indexOf('!') !== -1) {
    calc = true
    varName = varName.replace('!', '')
  }

  if (checkAdd(varName)) {
    var line = {}
    line.Title = title
    line.Calculate = calc
    line.VarName = varName
    line.M1 = 0
    line.M2 = 0
    line.M3 = 0
    line.M4 = 0
    line.M5 = 0
    line.M6 = 0
    line.Avg = 0
    line.AvgPrognose = 0
    return line
  } else {
    return undefined
  }
}

export function initOdds () {
  var lines = []

  var positions = [
    'Итого Выручка',
    'Выручка (Услуги)',
    'Выручка (Торговля)',
    'Выручка (С/Х)',
    'Выручка (Производство)',
    'Прочие поступления',
    'Доходы из статьи ОПиУ',
    'Разовые доходы от продажи основных средств',
    'Разовые поступления в виде спонсорской помощи',
    'Кредиты/Займы',
    'Кредиты банков',
    'Частные займы',
    'Финансовая помощь',
    'Затраты денежных средств',
    'Заработная плата',
    'Доставка товаров/сырья',
    'Транспортные расходы',
    'Командировочные расходы',
    'Аренда',
    'Коммунальные услуги',
    'Налоги',
    'Услуги связи',
    'Текущий ремонт',
    'Реклама',
    'Расходный материал',
    'Представительские расходы',
    'Брак/порча/списания',
    'Спонсорские/благотворительные расходы',
    'Прочие расходы по бизнесу',
    'Капитальные затраты',
    'Строительство, ремонт',
    'Покупка основных средств',
    'Затраты вне бизнеса',
    'Погашение кредитов',
    'Результат месяца'
  ]

  var vNames = [
    '!TotalRevenues',
    '!RevenuesService',
    '!RevenuesTrade',
    '!RevenuesAgriculture',
    '!RevenuesProduction',
    '!OtherSupply',
    '!IncomeFromOPIU',
    'SingleIncome',
    'IncomeFromSponsorship',
    '!Loans',
    'BankLoans',
    'PrivateLoans',
    'FinancialAid',
    '!CostOfMoney',
    'Wage',
    'DeliveryOfGoods',
    'Fare',
    'TravelExpenses',
    'Rent',
    'Utilities',
    'Taxes',
    'CommunicationServices',
    'Maintenance',
    'Advertising',
    'Consumables',
    'Hospitality',
    'MarriageDamageCancellation',
    'SponsorshipCharitableExpenses',
    'OtherBusinessExpenses',
    '!CapitalExpenditures',
    'ConstructionRepair',
    'PurchaseOfFixedAssets',
    'CostsOutOfBusiness',
    'RepaymentOfLoans',
    '!ResultOfTheMonth'
  ]
  for (var i = 0; i < positions.length; i++) {
    var l = initLine(positions[i], vNames[i])
    if (l !== undefined) { lines.push(l) }
  }

  return lines
}

export function initOpiu () {
  var lines = []

  var positions = [
    'Выручка (Услуги)',
    'Себестоимость прод. товаров (Услуги)',
    'Маржа (Услуги)',
    'Валовая прибыль (Услуги)',

    'Выручка (Торговля)',
    'Себестоимость прод. товаров (Торговля)',
    'Маржа (Торговля)',
    'Валовая прибыль (Торговля)',

    'Выручка (С/Х)',
    'Себестоимость прод. товаров (С/Х)',
    'Маржа (С/Х)',
    'Валовая прибыль (С/Х)',

    'Выручка (Производство)',
    'Себестоимость прод. товаров (Производство)',
    'Маржа (Производство)',
    'Валовая прибыль (Производство)',

    'Итого Выручка',
    'Итого Валовая прибыль',
    'Итого расходы по бизнесу',
    'Заработная плата',
    'Доставка товаров/сырья',
    'Транспортные расходы',
    'Командировочные расходы',
    'Аренда',
    'Коммунальные услуги',
    'Налоги',
    'Услуги связи',
    'Текущий ремонт',
    'Реклама',
    'Расходный материал',
    'Представительские расходы',
    'Брак/порча/списания',
    'Спонсорские/благотворительные расходы',
    'Прочие расходы по бизнесу',
    'Прибыль по бизнесу',
    'Прочие расходы',
    'Семейные',
    'Оплата за обучение детей',
    'Помощь родителям/детям',
    'Посещение мероприятий',
    'Хобби/увлечения',
    'Путешествия семьей',
    'Выплата дивидендов',
    'Другое (расход)',
    'Прочие доходы',
    'Зарплата членов семьи',
    'Доход от сдачи в аренду недвижимсти',
    'Доход от неосновной деятельности клиента',
    'Другое (доход)',
    'Чистая прибыль',
    'Взнос по займу',
    'Соотношение взнос/прибыль',
    'Скорость товарооборота (Услуги)',
    'Скорость товарооборота (Торговля)',
    'Скорость товарооборота (С/Х)',
    'Скорость товарооборота (Производство)',
    'Рентабельность продаж (Услуги)',
    'Рентабельность продаж (Торговля)',
    'Рентабельность продаж (С/Х)',
    'Рентабельность продаж (Производство)'
  ]

  var vNames = [
    'RevenuesService',
    'CostOfGoodsService',
    '!MarginService',
    '!GrossProfitService',

    'RevenuesTrade',
    'CostOfGoodsTrade',
    '!MarginTrade',
    '!GrossProfitTrade',

    'RevenuesAgriculture',
    'CostOfGoodsAgriculture',
    '!MarginAgriculture',
    '!GrossProfitAgriculture',

    'RevenuesProduction',
    'CostOfGoodsProduction',
    '!MarginProduction',
    '!GrossProfitProduction',

    '!TotalRevenues',
    '!TotalGrossProfit',
    '!TotalExpensesForBusiness',
    'Wage',
    'DeliveryOfGoods',
    'Fare',
    'TravelExpenses',
    'Rent',
    'Utilities',
    'Taxes',
    'CommunicationServices',
    'Maintenance',
    'Advertising',
    'Consumables',
    'Hospitality',
    'MarriageDamageCancellation',
    'SponsorshipCharitableExpenses',
    'OtherBusinessExpenses',
    '!ProfitOnBusiness',
    '!OtherExpenses',
    'FamilyExpenses',
    'PaymentForTheEducationOfChildren',
    'AssistanceToParentsChildren',
    'AttendanceEvents',
    'Hobbies',
    'TravelingFamily',
    'DividendPayment',
    'OtherFamilyExpenses',
    '!OtherIncome',
    'SalaryOfFamilyMembers',
    'IncomeFromTheRentalOfImmovableProperty',
    'IncomeFromNonCoreActivitiesOfTheClient',
    'OtherIncomeOut',
    '!NetProfit',
    '!LoanPayment',
    '!ValueOfContributionProfit',
    '!SpeedOfTurnoverService',
    '!SpeedOfTurnoverTrade',
    '!SpeedOfTurnoverAgriculture',
    '!SpeedOfTurnoverProduction',
    '!ProfitabilityOfSalesService',
    '!ProfitabilityOfSalesTrade',
    '!ProfitabilityOfSalesAgriculture',
    '!ProfitabilityOfSalesProduction'
  ]
  for (var i = 0; i < positions.length; i++) {
    var l = initLine(positions[i], vNames[i])
    if (l !== undefined) { lines.push(l) }
  }

  return lines
}
