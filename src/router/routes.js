
const routes = [
  { path: '', component: () => import('pages/Index.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/Home.vue') },
      { path: '/products', component: () => import('pages/ProductsPage.vue') },
      { path: '/project/:id', component: () => import('pages/ProjectDetail.vue') },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
