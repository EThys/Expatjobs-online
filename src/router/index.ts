import HomeView from '../views/HomeView.vue'
import ContactView from '@/views/ContactView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import DetailJobsView from '@/views/jobs/DetailJobsView.vue'
import UnauthorizedView from '@/views/Errors/UnauthorizedView.vue'
import NotFoundView from '@/views/Errors/NotFoundView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// import { getUser } from '@/stores/user'
import RegisterView from '@/views/Auth/RegisterView.vue'

// Définition des métadonnées de route étendues
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiredRole?: 'admin' | 'manager' | string
    title?: string
    breadcrumb?: string
  }
}

// Configuration des routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Accueil' },
  },
  {
    path: '/detail/jobs',
    name: 'detailJobs',
    component: DetailJobsView,
    meta: { title: 'jobs_detail' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'Contact' },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Connexion', requiresAuth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { title: 'register', requiresAuth: false },
  },
  //   {
  //     path: '/register',
  //     name: 'register',
  //     component: RegisterView,
  //     meta: {
  //       requiresAuth: true,
  //       requiredRole: 'admin',
  //       title: 'register',
  //       breadcrumb: 'register',
  //     },
  //   },
  //   {
  //     path: '/admin/dashboard/forfait',
  //     name: 'forfait',
  //     component: PlanForfaitView,
  //     meta: {
  //       requiresAuth: true,
  //       requiredRole: 'admin',
  //       title: 'Nos Forfaits',
  //       breadcrumb: 'Forfaits'
  //     }
  //   },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: UnauthorizedView,
    meta: { title: 'Non autorisé' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Page introuvable' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

// Garde de navigation globale
router.beforeEach(async (to, from, next) => {
  const user = {
    user: {
      Role: 'user',
    },
  }

  // Gestion du titre de la page
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title)
  if (nearestWithTitle) {
    document.title = `${nearestWithTitle.meta.title} | ExpatJobs`
  }

  // Vérification d'authentification
  if (to.meta.requiresAuth) {
    if (!user) {
      // Redirection vers login avec retour à la route demandée
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
      return
    }

    // Vérification des rôles
    if (to.meta.requiredRole && user.user.Role !== to.meta.requiredRole) {
      next('/unauthorized')
      return
    }
  }

  // Si l'utilisateur est connecté et essaie d'accéder à la page de login
  // if (to.name === 'login' && user) {
  //   // Rediriger vers le dashboard approprié selon le rôle
  //   let redirectPath = '/';

  //   switch(user.Role) {
  //     case 'admin':
  //       redirectPath = '/admin/dashboard/agence';

  //       break;
  //     case 'manager':
  //       redirectPath = '/user/dashboard/mes-agences';
  //       break;
  //     // Ajoutez d'autres rôles au besoin
  //     default:
  //       // Pour les autres rôles non gérés explicitement
  //       redirectPath = '/login';
  //   }

  //   next(redirectPath);
  //   return;
  // }

  next()
})

export default router
