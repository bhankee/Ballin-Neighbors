import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Teams from '@/components/Team/Teams';
import CreateTeam from '@/components/Team/CreateTeam';
import Profile from '@/components/User/Profile';
import Signup from '@/components/User/Signup';
import Signin from '@/components/User/Signin';
import Team from '@/components/Team/Team';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams
    },
    {
      path: '/team/new',
      name: 'CreateTeam',
      component: CreateTeam,
      beforeEnter: AuthGuard
    },
    {
      path: '/teams/:id',
      name: 'Team',
      props: true,
      component: Team
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
});
