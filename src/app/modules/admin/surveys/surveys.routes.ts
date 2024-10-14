import { Routes } from '@angular/router';

import { SurveysComponent } from './surveys.component';
import { SurveysFormComponent } from './surveys-form/surveys-form.component';
import { SurveyPreviewComponent } from './survey-preview/survey-preview.component';

export default [
  {
    path: '',
    component: SurveysComponent,
  },
  {
    path: 'form',
    component: SurveysFormComponent,
  },
  {
    path: 'form/:id',
    component: SurveysFormComponent,
  },
  {
    path: 'preview/:id',
    component: SurveyPreviewComponent,
  },
] as Routes;
