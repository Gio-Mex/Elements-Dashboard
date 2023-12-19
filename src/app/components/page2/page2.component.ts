import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FirebaseService } from '../../services/firebase.service';
import { TableService } from '../../services/table.service';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.css',
})
export class Page2Component implements OnInit {
  dataSource: any = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(
    private firebaseService: FirebaseService,
    private dialog: MatDialog,
    private tableService: TableService
  ) {}
  private reloadTableSubject: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.loadTable();
    this.tableService.reloadTable$.subscribe(() => {
      this.loadTable();
    });
  }

  loadTable() {
    this.firebaseService.getData('/elements.json').subscribe((data) => {
      this.dataSource = Object.values(data);
    });
  }

  addElement() {
    this.dialog.open(DialogComponent);
  }
}
