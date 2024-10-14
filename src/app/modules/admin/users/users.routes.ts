import { Routes } from '@angular/router';
import { inject } from '@angular/core';

import { UsersComponent } from 'app/modules/admin/users/users.component';
import { UserFormComponent } from 'app/modules/admin/users/user-form/user-form.component';

// import { UserService } from 'app/modules/admin/users/users.service';

export default [
    {
        path: '',
        component: UsersComponent,
        // resolve: {
        //     data: () => inject(UserService).getData(),
        // },
    },
    {
        path: 'form',
        component: UserFormComponent,
    },
    {
        path: 'form/:id',
        component: UserFormComponent,
    },
] as Routes;
