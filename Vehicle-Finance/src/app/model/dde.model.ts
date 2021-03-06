export interface Dde {
    vehicleValuation?: VehicleValuation;
    pslData?: PslData;
    applicantDetails?: ApplicantDetails;
    customerProfile?: CustomerProfile;
    loanDetails?: LoanDetails;
    fleetDetails?: FleetDetails;
    trackVehicle?: TrackVehicle;
}

export interface VehicleValuation {
    valuatorType?: string;
    valuatorCode?: string;
    valuatorName?: string;
    valuationAmount?: number;
    valuationDate?: string;
    idv?: string;
    idvValidityDate?: string;
    vhAvailInGrid?: string;
    gridAmount?: string;
    assetManufacturer?: string;
    assetModel?: string;
    newUsedAsset?: string;
    vechicleNoPrefix?: string;
    vechicleNumber?: string;
    chassisNumber?: string;
    engineNumber?: string;
    yearRegOfAsset?: string;
    monthRegOfAsset?: string;
    ageOfAsset?: string;
    sellerShortDescr?: string;
    secondAsset?: string;
    secondVechicleNoPrefix?: string;
    secondVechicleNo?: string;
    secondChassisNumber?: string;
    agricultureProof?: string;
    fcExpiryDate?: string;
    vehicleRegDate?: string;
    gvw?: string;
    reRegisteredVechicle?: string;
    interStateVehicle?: string;
    duplicateRC?: string;
    cubicCapacity?: string;
    seatingCapacity?: string;
    existingVechicleOwned?: string;
    noOfVehicles?: string;
    existingSelfCostAsset?: string;
    total?: string;
    make?: string;
    model?: string;
    year?: string;
    registeredOwner?: string;
    registeredOwnerName?: string;
    vhNoPrefix?: string;
    vhNumber?: string;
    costOfVehicle?: string;
}

export interface PslData {
    activity?: string;
    propertyType?: string;
    detailActivity?: string;
    goodsManufactured?: string;
    typeOfService?: string;
    purposeOfLoanAg?: string;
    purposeOfLoanMsme?: string;
    businessActivity?: string;
    landHolding?: string;
    landOwner?: string;
    relWithLandowner?: string;
    farmerType?: string;
    landAreaInAcres?: string;
    landProof?: string;
    landProofUpload?: string;
    loanAmount?: string;
    proofOfInvest?: string;
    investProofUpload?: string;
    nameOfCa?: string;
    nameOfCaFirm?: string;
    caRegisterNo?: string;
    udinNo?: string;
    caCertifiedAmount?: string;
    otherInvestmentCost?: string;
    totalInvestmentCost?: string;
    investInEquipment?: string;
    investPlantMachinery?: string;
    cityTier?: string;
    investmentSocialInfra?: string;
    investmentOtherBank?: string;
    totalInvestment?: string;
    propertyLocatedCity?: string;
    propertyLocation?: string;
    propertyPincode?: string;
    landAmount?: string;
    landCost?: string;
    constructionCost?: string;
    totalPropertyCost?: string;
    registrationCost?: string;
    pslConsiderCost?: string;
    pslCategoryAg?: string;
    pslCategoryMsme?: string;
    pslCategoryHos?: string;
    pslSubCategoryAg?: string;
    pslSubCategoryMsme?: string;
    pslCertificateAg?: string;
    pslCertificateMsme?: string;
    pslCertificateHos?: string;
    weakerSectionAg?: string;
    weakerSectionMsme?: string;
}

export interface ApplicantDetails {
    applicantName?: string;
    fatherName?: string;
    gender?: string;
    maritalStatus?: string;
    physicallyChallenged?: string;
    residenceNo?: string;
    officeNo?: string;
    mobile?: string;
    residenceAddress?: string;
    bankName?: string;
    accountNo?: string;
    landmark?: string;
    locate?: string;
    locality?: string;
    residentialType?: string;
    standardHouse?: string;
    sizeOfHouse?: string;
    stdOfLiving?: string;
    houseOwnership?: string;
    ratingBySo?: string;
}

export interface CustomerProfile {
    addressRecord?: string;
    noEmployees?: string;
    nameBoardSeen?: string;
    officePremises?: string;
    sizeOfOffice?: string;
    ratingBySo?: string;
    mismatchAddress?: string;
    selfieWithHouse?: string;
    ownershipProof?: string;
    metCustomer?: string;
}

export interface LoanDetails {
    costOfVehicle?: string;
    modelType?: string;
    loanAmt?: string;
    marginMoney?: string;
    loanAmtReq?: string;
    sourcePurchase?: string;
    nameOfFinancer?: string;
    awareMarginMoney?: string;
    nameOfChannel?: string;
    sellerVehicle?: string;
    knowAbtVehicle?: string;
    moneyInvested?: string;
    moneyBorrowed?: string;
    marketValue?: string;
    purchasedValue?: string;
    vehicleCondition?: string;
    usageFunds?: string;
    vehicleConditions?: string;
    remarksOthers?: string;
    earlierDriving?: string;
    runningAttached?: string;
    awareDue?: string;
    vehicleMake?: string;
    model1?: string;
    registrationNo?: string;
    regCopyVerified?: string;
    hpaNbfc?: string;
    engineNumber?: string;
    chassisNumber?: string;
    permitDate?: string;
    fitnessDate1?: string;
    taxDate?: string;
    insuranceCopy?: string;
    insuranceDate?: string;
    vehicleVerified?: string;
    physicalCondition?: string;
    vehicleRoute?: string;
    noTrips?: string;
    tripAmt?: string;
    selfDriver?: string;
    remarks?: string;
}

export interface FleetDetails {

    regdNo?: string;
    regdOwner?: string;
    relation?: string;
    make?: string;
    yom?: string;
    financier?: string;
    loanNo?: string;
    purchaseDate?: string;
    tenure?: string;
    paid?: string;
    seasioning?: string;
    ad?: string;
    pd?: string;
    gridValue?: string;
}
export interface TrackVehicle {
    nameOfTheClient?: string;
    nameOfTheFinancier?: string;
    assetsFinanced?: string;
    repaymentMode?: string;
    financeAmount?: string;
    financeCharges?: string;
    contractValue?: string;
    contNo?: string;
    vehicleNo?: string;
    typesOfFinance?: string;
    accpuntStatus?: string;
    loanStatus?: string;
    loanMaturityDate?: string;
    countOn30?: string;
    cpuntOn90?: string;
    totalNoOfEmis?: string;
    noOfEmisPaid?: string;
    balanceTenor?: string;
    totalDelay?: string;
    peakDelay?: string;
    avgDelay?: string;
    trackStatus?: string;
    totalAmtPaid?: string;
    installmentAmt?: string;
    dueDate?: string;
    rcptNp?: string;
    recdDate?: string;
    rcptAmount?: string;
    delayDays?: string;
    paymentsExcess?: string;
}