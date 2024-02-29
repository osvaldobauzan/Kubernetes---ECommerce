## Start Project
Dentro de la carpeta frontend
```
npm i
npm start / ng serve
npm run build
```
## Pasos
https://www.youtube.com/watch?v=l_r9nRJ9YTk


```
ng new frontend --routing
npm install -g @angular/cli
npm install --save @angular/material
npm install --save @angular/animations
npm install @ionic/angular
npm install jwt-decode
// npm install firebase @angular/fire --save
//npm install @google-cloud/storage

ng serve -o
```
- Components
``` 
ng g c components/pages/index
ng g c components/pages/aboutus
ng g c components/pages/signup
ng g c components/pages/signin
ng g c components/pages/profile
ng g c components/pages/shop
ng g c components/pages/shop-product
ng g c components/pages/blog
ng g c components/pages/blog-article
ng g c components/pages/perfumes
ng g c components/pages/perfumes-man
ng g c components/pages/perfumes-woman
ng g c components/pages/perfumes-unisex
ng g c components/pages/perfumes-unisex
ng g c components/pages/contact
ng g c components/pages/arch
ng g c components/pages/analytics

ng g c components/partials/header
ng g c components/partials/footer
ng g c components/partials/change-password
ng g c components/partials/user-reviews
ng g c components/partials/product-review
ng g c components/partials/orders-history
// EJEMPLO (NO USAR): Las tareas a las que se puede acceder sin autenticarse
ng g c components/pages/tasks
// EJEMPLO (NO USAR): Las tareas a las que se puede acceder autenticándose
ng g c components/pages/private-tasks
``` 
- Services
```
ng g s services/token-interceptor
ng g s services/auth
ng g s services/product
ng g s services/xutilities
```
En **ecommerce\user2\frontend\src\app\app.routes.ts**
```
import { Routes, RouterModule } from '@angular/router';

// Compoennts

import { TasksComponent } from './components/pages/tasks/tasks.component';
import { TasksPrivateComponent } from './components/pages/tasks-private/tasks-private.component';
import { SigninComponent } from './components/pages/signin/signin.component';
import { SignupComponent } from './components/pages/signup/signup.component';

export const routes: Routes = [
    {path: '', redirectTo: '/tasks', pathMatch: 'full'},
    {path: 'tasks', component: TasksComponent},
    {path: 'private', component: TasksPrivateComponent},
    {path: 'login', component: SigninComponent},
    {path: 'signup', component: SignupComponent},
];

```
- En **ecommerce\user2\frontend\src\app\components\partials\header\header.component.ts** preparar los imports
```
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}

```
- Por ejemplo: **ecommerce\user2\frontend\src\app\components\partials\header\header.component.html**
```

<div>
    <ul>
        <li>
            <a routerLink="/tasks"> Tasks</a>
        </li>
        <li>
            <a routerLink="/private"> Private</a>
        </li>
        <li>
            <a routerLink="/signup"> SignUp </a>
        </li>
        <li>
            <a routerLink="/login"> SignIn </a>
        </li>
    </ul>

</div>
```