import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrarComponent } from './component/registrar/registrar.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent  },
    { path: 'registrar', component: RegistrarComponent  },


    { path: '**', redirectTo: '' }
];
