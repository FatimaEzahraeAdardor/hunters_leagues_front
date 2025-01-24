import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {UsersEffects} from "./store/users/users.effects";
import {usersReducer} from "./store/users/users.reducer";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptorsFromDi(), withFetch()), provideStore(), provideEffects(),provideStore({ users: usersReducer }), // Provide the users reducer
    provideEffects([UsersEffects]), ]
};

