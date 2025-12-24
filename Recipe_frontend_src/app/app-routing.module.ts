import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
// import { NewRecipeComponent } from './new-recipe/new-recipe.component';
// import { RecipeComponent } from './recipe/recipe.component';
// import { MovieComponent} from './movie/movie.component';
import { RegisterComponent } from "./register/register.component";
// import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { ChangePassComponent } from "./change-pass/change-pass.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { AddMovieComponent } from "./add-movie/add-movie.component";
import { MyTicketsComponent } from "./my-tickets/my-tickets.component";
import { BookTicketComponent } from "./book-ticket/book-ticket.component";


const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "auth/login", component: LoginComponent },
  { path: "home/signup", component: RegisterComponent },
  { path: 'movie/:id', component: MovieListComponent },
  // { path: 'new_recipe', component: NewRecipeComponent },
  // { path: 'update_recipe/:id', component: UpdateRecipeComponent },
  { path: "change_password", component: ChangePassComponent },
  { path: "add-movie", component: AddMovieComponent},
  { path: "my-tickets", component: MyTicketsComponent },
  { path: "book-ticket", component: BookTicketComponent}
  // { path: 'movies', component: MovieListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
