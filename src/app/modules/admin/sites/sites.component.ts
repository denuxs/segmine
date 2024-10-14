import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SiteService } from '../../../services/site.service';

import { FuseTableComponent } from '../../../shared/fuse-table/fuse-table.component';

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, FuseTableComponent],
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.scss',
})
export class SitesComponent implements OnInit {
  private _siteService = inject(SiteService);

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  dataSource = [];
  columns = [
    {
      key: 'name',
      display: 'Nombre',
    },
    {
      key: 'country',
      display: 'Pais',
    },
    {
      key: 'department',
      display: 'Departamento',
    },
    {
      key: 'action',
      display: '',
      isAction: true,
      url: '/admin/sites/form/',
    },
  ];

  isLoading = true;

  constructor() {}

  ngOnInit(): void {
    this.getSites();
  }

  getSites() {
    this._siteService
      .fetchData()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.dataSource = response;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('error cargando sitios');
        },
      });
  }

  handleDeleteRow(siteId: number) {
    // const confirmation = this._fuseConfirmationService.open({
    //     title: 'Eliminar sitio',
    //     message: 'Desea borrar el sitio?',
    //     actions: {
    //         confirm: {
    //             label: 'Eliminar',
    //         },
    //     },
    // });
    // confirmation.afterClosed().subscribe((result) => {
    //     // If the confirm button pressed...
    //     if (result === 'confirmed') {
    //         console.log('confirm');
    //         // this.deleteSite(siteId);
    //     }
    // });
  }

  deleteSite(siteId: number) {
    this._siteService
      .deleteData(siteId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.dataSource = this.dataSource.filter(
            (item: any) => item.id != siteId
          );
        },
        error: (err) => {
          console.error('error eliminando sitio');
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
