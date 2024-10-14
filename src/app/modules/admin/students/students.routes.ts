import { Routes } from '@angular/router';

import { StudentsComponent } from './students.component';
import { StudentsFormComponent } from './students-form/students-form.component';

export default [
  {
    path: '',
    component: StudentsComponent,
  },
  // {
  //     path: 'form',
  //     component: StudentsFormComponent,
  // },
  {
    path: 'form/:id',
    component: StudentsFormComponent,
  },
] as Routes;
