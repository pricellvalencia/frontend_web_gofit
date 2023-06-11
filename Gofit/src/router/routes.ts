import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/LoginPage.vue'),
    // children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { 
        path: '/instruktur', 
        component: () => import('components/InstrukturComponent.vue') 
      }
    ],
  },
  {
    path: '/kasir',
    component: () => import('layouts/KasirLayout.vue'),
    children: [
      { 
        path: '/member', 
        component: () => import('components/MemberComponent.vue') 
      },
      { 
        path: '/aktivasi', 
        component: () => import('components/AktivasiComponent.vue') 
      },
      { 
        path: '/depositUang', 
        component: () => import('components/DepositUangComponent.vue') 
      },
      { 
        path: '/depositKelas', 
        component: () => import('components/DepositKelasComponent.vue') 
      },
      { 
        path: '/presensiGym', 
        component: () => import('components/PresensiGymComponent.vue') 
      },
      { 
        path: '/presensiKelas', 
        component: () => import('components/PresensiKelasComponent.vue') 
      },
    ],
  },
  {
    path: '/mo',
    component: () => import('layouts/MOLayout.vue'),
    children: [
      { 
        path: '/jadwalDefault', 
        component: () => import('components/JadwalDefaultComponent.vue') 
      },
      { 
        path: '/jadwalHarian', 
        component: () => import('components/JadwalHarianComponent.vue') 
      },
      { 
        path: '/ijinInstruktur', 
        component: () => import('components/IjinInstrukturComponent.vue') 
      },
      { 
        path: '/laporan', 
        component: () => import('components/LaporanComponent.vue') 
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
