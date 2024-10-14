import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { StudentService } from '../../../services/student.service';

import { FuseTableComponent } from '../../../shared/fuse-table/fuse-table.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, FuseTableComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _studentService = inject(StudentService);

  dataSource = [];
  columns = [
    {
      key: 'username',
      display: 'Usuario',
    },
    {
      key: 'email',
      display: 'Correo',
    },
    {
      key: 'fullname',
      display: 'Nombre',
    },
    {
      key: 'action',
      display: '',
      isAction: true,
      url: '/admin/students/form/',
    },
  ];

  isLoading = true;

  constructor() {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._studentService
      .fetchData()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.dataSource = response;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('error cargando solicitantes');
        },
      });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  handleDeleteRow(siteId: number) {}

  deleteSite(siteId: number) {
    this._studentService
      .deleteData(siteId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.dataSource = this.dataSource.filter(
            (item: any) => item.id != siteId
          );
        },
        error: (err) => {
          console.error('error eliminando solicitante');
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
