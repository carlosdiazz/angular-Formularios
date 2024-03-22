import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectorPagesComponent } from './pages/selector-pages/selector-pages.component';
import { CountryRoutingModule } from './country-routing.module';

@NgModule({
  declarations: [SelectorPagesComponent],
  imports: [CommonModule, CountryRoutingModule, ReactiveFormsModule],
})
export class CountryModule {}
