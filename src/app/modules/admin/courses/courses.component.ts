import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CourseService } from '../../../services/course.service';

import { FuseTableComponent } from '../../../shared/fuse-table/fuse-table.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, FuseTableComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  private _courseService = inject(CourseService);

  dataSource = [];
  columns: any = [
    {
      key: 'title',
      display: 'Titulo',
    },
    {
      key: 'action',
      display: '',
      isAction: true,
      url: '/admin/courses/form/',
    },
  ];

  isLoading = true;

  constructor() {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this._courseService
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
    //     title: 'Eliminar curso',
    //     message: 'Desea borrar el curso?',
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

  deleteSite(courseId: number) {
    this._courseService
      .deleteData(courseId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.dataSource = this.dataSource.filter(
            (item: any) => item.id != courseId
          );
        },
        error: (err) => {
          console.error('error eliminando curso');
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
