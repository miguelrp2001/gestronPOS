import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface preciochangerData {
  precio: number;
}

@Component({
  selector: 'app-price-changer',
  templateUrl: './price-changer.component.html',
  styleUrls: ['./price-changer.component.css']
})
export class PriceChangerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<preciochangerData>, @Inject(MAT_DIALOG_DATA) public precio: preciochangerData) { }

  ngOnInit(): void {
  }

  enterdetector(event: any) {
    console.log(event);

    if (event.key == "Enter") {
      this.dialogRef.close(this.precio.precio);
    }
  }

}
