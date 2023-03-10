import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },
  {
    path: '/configuracio',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Configuracio.vue') }],
  },
  {
    path: '/grup/:idGrup',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/GrupSorteig.vue'), props: true }],
  },

  {
    path: '/editarAfegir',
		
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'afegirEditarParticipant', component: () => import('pages/ParticipantEditarAfegir.vue'), props: true }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
