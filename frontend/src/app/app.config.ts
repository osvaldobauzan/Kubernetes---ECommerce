import { ApplicationConfig, importProvidersFrom  } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideFirebaseApp,initializeApp } from '@angular/fire/app'
import { provideStorage,getStorage } from '@angular/fire/storage'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(),

    importProvidersFrom([
      provideFirebaseApp (() => 
        initializeApp({
          apiKey: "AIzaSyB6kpI7cg-fEim7JMo581nLCuj8n0DHugk",
          authDomain: "beta-shopping-fa365.firebaseapp.com",
          projectId: "beta-shopping-fa365",
          storageBucket: "beta-shopping-fa365.appspot.com",
          messagingSenderId: "981170774955",
          appId: "1:981170774955:web:2614a1fc2f8c165aaae8ee"
        })
      ),
      provideStorage (() => getStorage())
    ]),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true,
    // }

    ]
};
