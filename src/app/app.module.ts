import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';
import { StoreModule } from '@ngrx/store';
import { shoppingReducer } from './shopping-list/store/shopping.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      shoppingList: shoppingReducer
    }),
    //AuthModule,
    //RecipesModule,
    //ShoppingModule,
    SharedModule,
    CoreModule,
  ],
  providers: [
    LoggingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
