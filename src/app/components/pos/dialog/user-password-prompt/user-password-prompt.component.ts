import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Perfil } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-password-prompt',
  templateUrl: './user-password-prompt.component.html',
  styleUrls: ['./user-password-prompt.component.css']
})
export class UserPasswordPromptComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<Perfil>, @Inject(MAT_DIALOG_DATA) public perfil: Perfil) { }

  ngOnInit(): void {
  }

}
