import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../model/Movie';
import { Ticket } from '../model/Ticket';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api/movies';

  constructor(private http: HttpClient) {}

  bookingUpdates = new Subject<Movie>();
  myTickets = new BehaviorSubject<Ticket[]>([]);

  // Get all movies
  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/all`);
  }

  getMovieById(id: number) {
    return this.http.get<Movie>(`${this.baseUrl}/${id}`);
  }

  // Search movies by name
  getMoviesByName(term: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/all/byName/${term}`);
  }

  addMovie(movieRequest: { name: string; totalTickets: number; theatreName: string }): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/add`, movieRequest);
  }

  updateMovieStatus(movieId: number, status: string): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/${movieId}/update-status`, { status });
  }

  refreshMovieAvailability(movieId: number): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/${movieId}/update-status`, {});
  }

  deleteMovie(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${movieId}`);
  }
    
  // Book tickets
  bookTickets(request: { movieId: number, numberOfTickets: number, seatNumber: string[] }): Observable<Ticket[]> {
    return this.http.post<Ticket[]>(`${this.baseUrl}/book`, request);
  }

  // Get tickets for the logged-in user
  getMyTickets(): Observable<Ticket[]> {
  return this.http.get<Ticket[]>('/api/my-tickets');
}

 
}