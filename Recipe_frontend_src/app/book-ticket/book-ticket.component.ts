import { Component, Input } from '@angular/core';
import { Movie } from '../model/Movie';
import { Ticket } from '../model/Ticket';
import { ApiService } from '../services/api.service';
import { TicketBookingRequest } from '../model/TicketBookingRequest'; // added import
import { ActivatedRoute, Router } from '@angular/router';
  
type SeatStatus = 'available' | 'selected' | 'booked';
  
interface Seat {
  label: string;    
  status: SeatStatus;
}
  
@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent {

  // From your screenshot: A1..A20 in one row
  seats: Seat[] = Array.from({ length: 20 }, (_, i) => ({
    label: `A${i + 1}`,
    status: 'available' // fixed: previously used `i < 0` which was always false
  }));

  movieId: string | number = '';
  loading = false;
  successMsg = '';
  errorMsg = '';

  get selectedSeats(): string[] {
    return this.seats.filter(s => s.status === 'selected').map(s => s.label);
  }

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    // try to read movieId from route if not provided by parent
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (idFromRoute) this.movieId = idFromRoute;
  }

  toggleSeat(seat: Seat) {
    if (seat.status === 'booked') return;
    seat.status = seat.status === 'selected' ? 'available' : 'selected';
    this.successMsg = '';
    this.errorMsg = '';
  }

  confirmBooking() {
    if (!this.movieId || this.selectedSeats.length === 0) {
      this.errorMsg = 'Please select at least one seat.';
      return;
    }

    const payload: TicketBookingRequest = {
      movieId: Number(this.movieId),
      numberOfTickets: this.selectedSeats.length,
      seatNumber: this.selectedSeats // use selectedSeats (string[]) instead of this.seatNumber
    };

    console.log('booking payload:', payload);

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.api.bookTickets(payload).subscribe({
      next: (tickets: Ticket[]) => {
        // update local seat states
        this.seats.forEach(s => { if (s.status === 'selected') s.status = 'booked'; });

        // push tickets to shared subject so MyTicketsComponent updates
        this.api.myTickets.next(tickets);

        // if backend returns updated movie object instead, emit bookingUpdates too:
        // if (Array.isArray(tickets) && tickets.length > 0 && tickets[0].movie) {
        //   this.api.bookingUpdates.next(tickets[0].movie);
        // }

        this.successMsg = 'Movie booked successfully.';
        this.loading = false;

        // navigate to My Tickets view (optional)
        this.router.navigate(['/my-tickets']);
      },
      error: (err: any) => {
        this.errorMsg = err?.error?.message || 'Booking failed. Please try again.';
        this.loading = false;
      }
    });
  }

}