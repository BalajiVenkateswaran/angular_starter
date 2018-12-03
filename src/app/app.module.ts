import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRootComponent } from './root/app-root.component';
import { AppRoutingModule } from './app-routing.module';
import { RpAngularComponentsModule } from 'src/lib/angular-components.module';

@NgModule({
  declarations: [
    AppRootComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    RpAngularComponentsModule
  ],

  providers: [],

  bootstrap: [AppRootComponent]
})

export class AppModule { }
