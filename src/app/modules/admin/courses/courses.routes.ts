import { Routes } from '@angular/router';

import { inject } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from './course-form/course-form.component';

export default [
    {
        path: '',
        component: CoursesComponent,
        // resolve: {
        //     data: () => inject(FinanceService).getData(),
        // },
    },
    {
        path: 'form',
        component: CourseFormComponent,
        // resolve  : {
        //     data: () => inject(FinanceService).getData(),
        // },
    },
    {
        path: 'form/:id',
        component: CourseFormComponent,
        // resolve  : {
        //     data: () => inject(FinanceService).getData(),
        // },
    },
] as Routes;
