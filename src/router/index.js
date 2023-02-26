import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import UserAccount from '../views/UserAccount.vue'
import WorkflowInitiation from '../views/WorkflowInitiation.vue'
import ApprovalPage	from '../views/ApprovalPage.vue'
import DashBoard from '../views/DashBoard.vue'
import NotificationApp from '../views/NotificationApp.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/useraccount',
    name: 'userAccount',
    component: UserAccount
  },
  {
    path: '/workflowInitiation',
    name: 'workflowInitiation',
    component: WorkflowInitiation
  },
  
  {
    path: '/approvals',
    name: 'approvalPage',
    component: ApprovalPage
  },
   {
    path: '/dashboard',
    name: 'dashBoard',
    component: DashBoard
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: NotificationApp
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
