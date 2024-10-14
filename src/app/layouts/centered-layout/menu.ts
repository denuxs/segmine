/* eslint-disable */

export const adminNavigation: any = [
  {
    id: 'apps.dashboard',
    title: 'Dashboard',
    type: 'basic',
    icon: 'heroicons_outline:chart-pie',
    link: '/dashboard',
  },
  {
    id: 'apps.courses',
    title: 'Cursos',
    type: 'basic',
    icon: 'heroicons_outline:book-open',
    link: '/admin/courses',
  },
  // {
  //     id: 'apps.evaluations',
  //     title: 'Evaluaciones',
  //     type: 'basic',
  //     icon: 'heroicons_outline:newspaper',
  //     link: '/admin/evaluations',
  // },
  {
    id: 'apps.students',
    title: 'Solicitantes',
    type: 'basic',
    icon: 'heroicons_outline:user-group',
    link: '/admin/students',
  },
  {
    id: 'apps.surveys',
    title: 'Formularios',
    type: 'basic',
    icon: 'heroicons_outline:newspaper',
    link: '/admin/surveys',
  },
  {
    id: 'apps.sites',
    title: 'Sitios',
    type: 'basic',
    icon: 'heroicons_outline:home',
    link: '/admin/sites',
  },
  // {
  //   id: 'apps.users',
  //   title: 'Usuarios',
  //   type: 'basic',
  //   icon: 'heroicons_outline:user',
  //   link: '/admin/users',
  // },
];

export const userNavigation: any = [
  {
    id: 'apps.dashboard',
    title: 'Dashboard',
    type: 'basic',
    icon: 'heroicons_outline:chart-pie',
    link: '/dashboard',
  },
  {
    id: 'apps.courses',
    title: 'Mis Cursos',
    type: 'basic',
    icon: 'heroicons_outline:academic-cap',
    link: '/user/courses',
  },
];
