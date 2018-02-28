import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Store',
    icon: 'fa fa-shopping-cart',
    link: '/pages/store',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/pages/login',
      },
      {
        title: 'Register',
        link: '/pages/signup',
      },
    ],
  },
];
