import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() headers: string[] = [];
  @Input() columns: string[] = [];
  @Input() data: any[] = [];

  @Output() actionClicked = new EventEmitter<string>();

  viewDetails(id: string) {
    this.actionClicked.emit(id); 
  }
}