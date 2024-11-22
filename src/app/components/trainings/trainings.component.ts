import { Training } from './../../model/training.model';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router, Route } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css'],
})
export class TrainingsComponent implements OnInit {
  listTrainings: Training[] | undefined;
  error: string | undefined;

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router,
    public authService: AuthenticateService
  ) {}

  ngOnInit(): void {
    this.getAllTrainings();
  }

  getAllTrainings() {
    this.apiService.getTrainings().subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
  onAddToCart(training: Training): void {
    if (training.quantity > 0) {
      this.cartService.addTraining(training);
      this.router.navigateByUrl('cart');
    }
    console.log(' Article ajouté au panier : ', training);
  }

  goToUpdate(training: Training) {
    this.router.navigateByUrl(`/training/${training.id}`);
  }

  deleteOneTraining(training: Training) {
    this.apiService.deleteTraining(training.id).subscribe({
      next: () => {
        this.listTrainings = this.listTrainings?.filter(
          (t) => t.id !== training.id
        );
        console.log('Formation supprimée avec succès');
      },
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }
}
