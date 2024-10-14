import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SurveyService } from '../../../services/survey.service';

import { FuseTableComponent } from '../../../shared/fuse-table/fuse-table.component';

@Component({
  selector: 'app-surveys',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, FuseTableComponent],
  templateUrl: './surveys.component.html',
  styleUrl: './surveys.component.scss',
})
export class SurveysComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  private _surveyService = inject(SurveyService);

  dataSource = [];
  columns = [
    {
      key: 'title',
      display: 'Titulo',
    },
    {
      key: 'action',
      display: '',
      isAction: true,
      url: '/admin/surveys/form/',
    },
  ];

  isLoading = true;

  constructor() {}

  ngOnInit(): void {
    this.getForms();
  }

  getForms() {
    this._surveyService
      .fetchData()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.dataSource = response;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('error cargando formularios');
        },
      });
  }

  handleDeleteRow(siteId: number) {}

  deleteSite(siteId: number) {
    this._surveyService
      .deleteData(siteId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.dataSource = this.dataSource.filter(
            (item: any) => item.id != siteId
          );
        },
        error: (err) => {
          console.error('error eliminando formulario');
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
