import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  position!: number;
  name!: string;
  weight!: number;
  symbol!: string;

  constructor(
    private firebaseService: FirebaseService,
    private tableService: TableService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  isButtonDisabled(): boolean {
    return !(this.position && this.name && this.weight && this.symbol);
  }
  onSubmit() {
    this.firebaseService
      .insertUser('/elements.json', {
        position: this.position,
        name: this.name,
        weight: this.weight,
        symbol: this.symbol,
      })
      .subscribe(() => {
        this.tableService.reloadTable();
        this.dialogRef.close();
      });
  }
}
