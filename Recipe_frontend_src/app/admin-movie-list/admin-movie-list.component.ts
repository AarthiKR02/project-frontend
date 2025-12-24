import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Movie } from '../model/Movie';

@Component({
  selector: 'app-admin-movie-list',
  templateUrl: './admin-movie-list.component.html',
  styleUrls: ['./admin-movie-list.component.css']
})
export class AdminMovieListComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  private subs = new Subscription();

  ngOnInit(): void {
    this.fetchMovies();
    this.subs.add(
      this.apiService.bookingUpdates.subscribe((updatedMovie) => {
        const prepared = { ...updatedMovie, numberOfTickets: updatedMovie.tickets?.length ?? 0 };
        const idx = this.movies.findIndex(m => m.id === prepared.id);
        if (idx >= 0) {
          this.movies[idx] = { ...this.movies[idx], ...prepared };
        } else {
          this.movies.unshift(prepared);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  fetchMovies() {
    this.loading = true;
    this.apiService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = (data ?? []).map(m => ({ ...m, numberOfTickets: m.tickets?.length ?? 0 }));
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load movies.';
        this.loading = false;
      }
    });
  }
  

  updateStatus(movie: Movie, status: string) {
    let backendStatus = status;
    if (status === 'ASAP') backendStatus = 'Book ASAP';
    if (status === 'SOLD_OUT') backendStatus = 'Sold Out';
  
    if (movie.id !== undefined) {
      this.apiService.updateMovieStatus(movie.id, backendStatus).subscribe({
        next: (updatedMovie) => {
          movie.status = updatedMovie.status;
        },
        error: () => {
          this.error = 'Failed to update status.';
        }
      });
    } else {
      this.error = 'Movie ID is missing.';
    }
  }

  refreshAvailability(movie: Movie) {
    if (movie.id !== undefined) {
      this.apiService.refreshMovieAvailability(movie.id).subscribe({
        next: (updatedMovie) => {
          movie.totalTickets = updatedMovie.totalTickets;
        },
        error: () => {
          this.error = 'Failed to refresh availability.';
        }
      });
    } else {
      this.error = 'Movie ID is missing.';
    }
  }
  
  deleteMovie(movie: Movie) {
    if (movie.id !== undefined) {
      this.apiService.deleteMovie(movie.id).subscribe({
        next: () => {
          this.movies = this.movies.filter(m => m.id !== movie.id);
        },
        error: () => {
          this.error = 'Failed to delete movie.';
        }
      });
    } else {
      this.error = 'Movie ID is missing.';
    }
  }
}