import { Component, OnInit } from '@angular/core';

import { SitesFormComponent } from '../sites-form/sites-form.component';

@Component({
  selector: 'app-sites-create',
  standalone: true,
  imports: [SitesFormComponent],
  templateUrl: './sites-create.component.html',
  styleUrl: './sites-create.component.scss',
})
export class SitesCreateComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
