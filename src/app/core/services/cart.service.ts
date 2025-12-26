import { Injectable } from '@angular/core';
import { consumerAfterComputation } from '@angular/core/primitives/signals';
import { BehaviorSubject, Observable } from 'rxjs';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  addItem(item: { id: number, name: string, price: number }, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ ...item, quantity });
    }

    this.cartItemsSubject.next([...currentItems]);
    console.log(`Cart updated: ${this.cartItemsSubject.value.length} total items.`);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getCartTotal(): number {
    return this.cartItemsSubject.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCurrentCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  removeItem(productId: number): void{
    const currentItems = this.cartItemsSubject.value.filter(item => item.id !== productId)
    this.cartItemsSubject.next(currentItems)
  }

  updateItemQuantity(productId: number, change: number):void{
    const currentItems = this.cartItemsSubject.value;
    const itemIndex = currentItems.findIndex(i => i.id === productId)

    if (itemIndex > -1 ){
      const itme = currentItems[itemIndex]
      itme.quantity += change

      if(itme.quantity <= 0){
        this.removeItem(productId)
      }
    }else{
      this.cartItemsSubject.next([...currentItems])
    }
  }
}
