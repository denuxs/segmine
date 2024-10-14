import {
  Component,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'error-404',
  templateUrl: './error-404.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class Error404Component {

  constructor() {}
}
