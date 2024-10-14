import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { SettingsComponent } from './settings.component';

export default [
  {
    path: '',
    component: SettingsComponent,
    // resolve  : {
    //     categories: () => inject(AcademyService).getCategories(),
    // },
  },
] as Routes;
