import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent  },
    { path: 'registrar', component: RegistrarComponent  },


    { path: '**', redirectTo: '' }
];
