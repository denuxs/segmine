import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-fuse-table',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './fuse-table.component.html',
  styleUrl: './fuse-table.component.scss',
})
export class FuseTableComponent {
  @Input('cols') tableCols: any = [];

  @Input() data = [];

  @Output() onDeleteRow = new EventEmitter<number>();

  get keys() {
    return this.tableCols.map((item: any) => item.key);
  }

  deleteRow(id: number) {
    this.onDeleteRow.emit(id);
  }
}
