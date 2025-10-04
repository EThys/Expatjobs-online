export const ApiRoutes = {
  //route for authentification
  login: 'login',
  register: 'users/sign-up/',
  logout: 'logout',
  changePassword: 'changePassword',

  //route for jobSkills

  getAlljobSkills: 'job-skills',
  updatejobSkills:'job-skills',
  addjobSkills:'job-skills',
  showjobSkills:'job-skills/{id}',
  deletejobSkills:'job-skills/{id}',

  //route for jobOffers

  getAlljobOffers: 'job-offers',
  updatejobOffers:'job-offers',
  addjobOffers:'job-offers',
  showjobOffers:'job-offers/{id}',
  deletejobOffers:'job-offers/{id}',

  //route for compagy




  

  storePlan: 'store/plan',
  AllPlan: 'plans',
  planDestroy:'planDestroy',
  planUpdate:'planUpdate',

  storeAgency: 'store/agency',
  putAgency: 'put/agency',
  deleteAgency: 'delete/agency',

  agenciesAll: 'agencies/all',
  agenciesshow: 'agencies/show',

}
