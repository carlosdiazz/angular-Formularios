import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'product-price',
  templateUrl: './price.component.html',
  styleUrl: './price.component.css',
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {
  public interval$?: Subscription;

  public ngOnInit(): void {
    console.log('PriceComponent => ngOnInit');
    this.interval$ = interval(1000).subscribe((value) => console.log(value));
  }
  public ngOnChanges(changes: SimpleChanges): void {
    console.log('PriceComponent => ngOnChanges');
    console.log({ changes });
  }
  public ngOnDestroy(): void {
    console.log('PriceComponent => ngOnDestroy');
    //Aqui cancelo el intervalo
    this.interval$?.unsubscribe();
  }
  @Input()
  public price: number = 0;
}
