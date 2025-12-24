// import {Component, OnInit} from '@angular/core';
// import {ApiService} from '../services/api.service';
// import {ActivatedRoute} from '@angular/router';
// import {Recipe} from '../model/recipe';
// import {Location} from '@angular/common';
// import { TokenStorageService } from '../auth/token-storage.service';

// @Component({
//   selector: 'app-recipe',
//   templateUrl: './recipe.component.html',
//   styleUrls: ['./recipe.component.css']
// })
// export class RecipeComponent implements OnInit {

//   roles!: string[];
//   authority!: string;
//   recipe!: Recipe;
//   instructions: string[] = [];
//   suggestions: string[] = [];
//   authService: any;

//   constructor(
//     private apiService: ApiService,
//     private route: ActivatedRoute,
//     private location: Location,
//     private tokenStorage: TokenStorageService
//   ) { }

//   ngOnInit() {
//     this.roles = this.tokenStorage.getAuthorities();
//     this.roles.every(role => {
//       if(role ==='ADMIN'){
//          this.authority='admin';
//       }
//     })
//     this.route.params.subscribe(params => {
//       const id = +params['id'];
//       this.getRecipe();
//     });
//   }

//   getRecipe(): void {
//     const idString = this.route.snapshot.paramMap.get('id');
//     if (idString !== null) {
//       const id = +idString;
//         this.apiService.getRecipe(id).subscribe(recipe => {
//           this.recipe = recipe;
//           this.instructions = recipe.instructions.split('\n');
//           this.suggestions = recipe.suggestions.split('\n');
//         });
//     }
//   }

//   // deleteThisRecipe(): void {
//   //   this.roles = this.tokenStorage.getAuthorities();
//   //   const isAdmin = this.roles.some(role => role === 'ADMIN');
   
//   //   if (isAdmin) {
//   //     this.authority = 'admin';
//   //     const idString = this.route.snapshot.paramMap.get('id');
//   //     if (idString !== null) {
//   //       const id = +idString;
//   //       if (confirm('Are you sure you want to delete this recipe?')) {
//   //         this.apiService.deleteRecipe(id).subscribe(
//   //           () => {
//   //             alert('Recipe deleted successfully');
//   //             this.location.back(); // Navigate back to the previous page
//   //           },
//   //           (err) => {
//   //             console.error('Error occurred while deleting recipe:', err);
//   //             alert('Error occurred while deleting recipe');
//   //           }
//   //         );
//   //       }
//   //     }
//   //   } else {
//   //     this.authority = 'user';
//   //     alert('You do not have authority to delete the recipe');
//   //   }
//   // }

//   deleteThisRecipe(): void {
//     const idString = this.route.snapshot.paramMap.get('id');
//     if (idString !== null) {
//       const id = +idString;
//       if (confirm('Are you sure you want to delete this recipe?')) {
//         this.apiService.deleteRecipe(id).subscribe(
//           () => {
//             alert('Recipe deleted successfully');
//             this.location.back(); // Navigate back to the previous page
//           },
//           (err) => {
//             console.error('Error occurred while deleting recipe:', err);
//             alert('Error occurred while deleting recipe');
//           }
//         );
//       }
//     }
//   }
  
// }