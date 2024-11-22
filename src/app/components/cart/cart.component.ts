import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Training } from 'src/app/model/training.model';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Training[] | undefined;
  total: number = 0;
  constructor(private authService : AuthenticateService, private cartService: CartService, private router : Router) {
    
   }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.getTotal(); 
  }

  onRemoveFromCart(training: Training) {
    this.cartService.removeTraining(training);
    this.cart = this.cartService.getCart(); 
  }


  
  order(): void{
    if(this.authService.getUser().email){

      this.router.navigateByUrl('customer');
    } else{
      this.router.navigateByUrl('connexion');
    }
  }
}
