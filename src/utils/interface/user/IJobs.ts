export interface IJobSkill{
    id:Number,
    skillName:String,
    jobOfferId:Number,
    experienceYear:Number
}

export interface IJobOffers{
    companyId: Number,
    title: String,
    description: String,
    location: String,
    salaryMin: Number,
    salaryMax: Number,
    jobType: String,
    experienceLevel: String,
    status: String,
    sector: String

}