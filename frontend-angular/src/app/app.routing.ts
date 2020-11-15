import { ModuleWithProviders, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Route } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PortatilesComponent } from './components/portatiles/portatiles.component';
import { MonitoresComponent } from './components/monitores/monitores.component';
import { CablesComponent } from './components/cables/cables.component';
import { AdaptadoresComponent } from './components/adaptadores/adaptadores.component';
import { SearchComponent } from './components/search/search.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'portatiles', component: PortatilesComponent},
    {path: 'monitores', component: MonitoresComponent},
    {path: 'cables', component: CablesComponent},
    {path: 'adaptadores', component: AdaptadoresComponent},
    {path: 'buscar/:search', component: SearchComponent},
    {path: 'home/crear', component: CreateComponent},
    {path: 'home/editar/:uuid', component: EditComponent},
    {path: '**', component: NotFoundComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);