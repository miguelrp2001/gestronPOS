import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Centro } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-ticket-print',
  templateUrl: './ticket-print.component.html',
  styleUrls: ['./ticket-print.component.css']
})
export class TicketPrintComponent implements OnInit {

  constructor(private appservice: AppService) { }

  centro: Centro = this.appservice.getCentro();

  ngOnInit(): void {
  }

}
