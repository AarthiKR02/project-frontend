import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Ticket } from '../model/Ticket';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.css'
})
export class MyTicketsComponent {

  tickets: Ticket[] = [];
  private subs = new Subscription();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // initialize from API once
    this.apiService.getMyTickets().subscribe(t => this.tickets = t);

    // subscribe to live updates (e.g. right after booking)
    this.subs.add(this.apiService.myTickets.subscribe(t => {
      if (t && t.length) this.tickets = t;
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
