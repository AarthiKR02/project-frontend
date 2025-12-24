import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NavigationComponent } from "./navigation/navigation.component";
// import { NewRecipeComponent } from './new-recipe/new-recipe.component';
// import { PopularComponent } from './popular/popular.component';
// import { RecipeComponent } from './recipe/recipe.component';
// import { RecipesComponent } from './recipes/recipes.component';
// import { SearchRecipeComponent } from './search-recipe/search-recipe.component';
// import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { httpInterceptorProviders } from "./auth/auth-interceptor";
import { HttpClientModule, provideHttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RegisterComponent } from "./register/register.component";
import { ChangePassComponent } from "./change-pass/change-pass.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { SearchMovieComponent } from "./search-movie/search-movie.component";
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AdminMovieListComponent } from './admin-movie-list/admin-movie-list.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    // NewRecipeComponent,
    // PopularComponent,
    // RecipeComponent,
    // RecipesComponent, // keep commented if not implemented
    // SearchRecipeComponent,
    // UpdateRecipeComponent,
    RegisterComponent,
    ChangePassComponent,
    MovieListComponent,
    SearchMovieComponent,
    AddMovieComponent,
    AdminMovieListComponent,
    MyTicketsComponent,
    BookTicketComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [httpInterceptorProviders, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
