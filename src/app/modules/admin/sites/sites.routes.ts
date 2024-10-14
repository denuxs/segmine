import { Routes } from '@angular/router';

import { SitesComponent } from './sites.component';
import { SitesFormComponent } from './sites-form/sites-form.component';
import { SitesCreateComponent } from './sites-create/sites-create.component';

export default [
  {
    path: '',
    component: SitesComponent,
  },
  // {
  //   path: 'create',
  //   component: SitesCreateComponent,
  // },
  {
    path: 'form',
    component: SitesFormComponent,
  },
  {
    path: 'form/:id',
    component: SitesFormComponent,
  },
] as Routes;
