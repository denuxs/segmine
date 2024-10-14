import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { CoursesComponent } from './courses.component';

export default [
  {
    path: '',
    component: CoursesComponent,
    // resolve: {
    //     data: () => inject(ProjectService).getData(),
    // },
  },
] as Routes;
