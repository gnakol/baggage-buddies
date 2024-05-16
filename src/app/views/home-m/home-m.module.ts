import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomePageComponent } from '../home-page/home-page.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';





@NgModule({
  declarations: [
    //HeaderComponent,
    //FooterComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    //HeaderComponent,  // Assure-toi d'exporter HeaderComponent
    //FooterComponent,
    HomePageComponent
  ]
})
export class HomeMModule { }
