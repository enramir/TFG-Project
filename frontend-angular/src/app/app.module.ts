import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PortatilesComponent } from './components/portatiles/portatiles.component';
import { MonitoresComponent } from './components/monitores/monitores.component';
import { CablesComponent } from './components/cables/cables.component';
import { AdaptadoresComponent } from './components/adaptadores/adaptadores.component';
import { SearchComponent } from './components/search/search.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    PortatilesComponent,
    MonitoresComponent,
    CablesComponent,
    AdaptadoresComponent,
    SearchComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    AngularFileUploaderModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
