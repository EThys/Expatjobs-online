export const ApiRoutes = {
  //route for authentification
  login: 'login',
  register: 'users/sign-up',
  logout: 'logout',
  changePassword: 'changePassword',

  //route for jobSkills

  getAlljobSkills: 'job-skills',
   getJobSkillsByJobOffer: 'job-skills/by-job-offer',
  updatejobSkills:'job-skills',
  addjobSkills:'job-skills',
  showjobSkills:'job-skills',
  deletejobSkills:'job-skills/{id}',

  //route for jobOffers

  getAlljobOffers: 'job-offers',
  searchJobOffers: 'job-offers',
  updatejobOffers:'job-offers',
  addjobOffers:'job-offers',
  showjobOffers:'job-offers',
  deletejobOffers:'job-offers/{id}',

  //route for compagy

  addCompagny:"companies",
  getAllCompagny:"companies",

  //route for candidate

  // Routes store

  addCandidateEducation: "candidate-education",
  addCandidateProfile: "candidate-profile", 
  addCandidateExperience: "candidate-experience",
  addCandidateSkills: "candidate-skill",

  // Routes GET
  getAllCandidateEducations: "candidate-education",
  getAllCandidateProfiles: "candidate-profile",
  getAllCandidateExperiences: "candidate-experience", 
  getAllCandidateSkills: "candidate-skill",
  
  getCandidateProfileById: "candidate-profile",
  getCandidateEducationById: "candidate-education",
  getCandidateExperienceById: "candidate-experience",
  getCandidateSkillById: "candidate-skill",

  // Routes UPDATE
  updateCandidateEducation: "candidate-education",
  updateCandidateProfile: "candidate-profile",
  updateCandidateExperience: "candidate-experience",
  updateCandidateSkill: "candidate-skill",

  // Routes DELETE
  deleteCandidateEducation: "candidate-education",
  deleteCandidateProfile: "candidate-profile",
  deleteCandidateExperience: "candidate-experience",
  deleteCandidateSkill: "candidate-skill",
  
  // Routes GET par profil
  getEducationsByProfile: "candidate-education/profile",
  getExperiencesByProfile: "candidate-experience/profile", 
  getSkillsByProfile: "candidate-skill/profile"
  
}
