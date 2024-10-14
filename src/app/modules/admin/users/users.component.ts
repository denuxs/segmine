import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from 'app/services/user.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';

import { FuseTableComponent } from 'app/shared/fuse-table/fuse-table.component';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [RouterLink, MatButtonModule, MatIconModule, FuseTableComponent],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
    private _userService = inject(UserService);

    dataSource = [];
    columns = [
        {
            key: 'username',
            display: 'Usuario',
        },
        {
            key: 'email',
            display: 'Email',
        },
        {
            key: 'fullname',
            display: 'Nombre',
        },
        {
            key: 'action',
            display: '',
            isAction: true,
            url: '/admin/users/form/',
        },
    ];

    isLoading = true;

    constructor(private _fuseConfirmationService: FuseConfirmationService) {}

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this._userService.fetchData().subscribe({
            next: (response) => {
                this.dataSource = response;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('error cargando usuarios');
            },
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    handleDeleteRow(siteId: number) {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar usuario',
            message: 'Desea borrar el usuario?',
            actions: {
                confirm: {
                    label: 'Eliminar',
                },
            },
        });

        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                console.log('confirm');
                // this.deleteSite(siteId);
            }
        });
    }

    deleteSite(siteId: number) {
        this._userService.deleteData(siteId).subscribe({
            next: (response) => {
                this.dataSource = this.dataSource.filter(
                    (item) => item.id != siteId
                );
            },
            error: (err) => {
                console.error('error eliminando usuario');
            },
        });
    }
}
