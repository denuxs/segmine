import { Routes } from '@angular/router';

import { inject } from '@angular/core';
import { ExpedientComponent } from 'app/modules/admin/expedient/expedient.component';
// import { UserService } from 'app/modules/admin/users/users.service';

export default [
    {
        path     : '',
        component: ExpedientComponent,
        // resolve  : {
        //     data: () => inject(UserService).getData(),
        // },
    },
] as Routes;
