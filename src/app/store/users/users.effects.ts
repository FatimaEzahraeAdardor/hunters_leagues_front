import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service'; // Replace with your actual service
import {
  loadUsers,
  loadUsersSuccess,
  loadUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure
} from './users.actions';
import {Page, User} from "../../core/model/common.model";

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions, // Stream of all actions
    private userService: UserService // Your service to fetch data
  ) {}

  // Effect to handle the loadUsers action
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers), // Listen for the loadUsers action
      mergeMap((action) =>
        this.userService.getUsers(action.page, action.pageSize).pipe(
          map((data: Page<User>) => loadUsersSuccess({ data })), // Dispatch success action with data
          catchError((error) => of(loadUserFailure({ error: error.message }))) // Dispatch failure action on error
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(({ userId }) =>
        this.userService.deleteUser(userId).pipe(
          map(() => deleteUserSuccess({ userId })),
          catchError(error => of(deleteUserFailure({ error: error.message })))
        )
      )
    )
  );
}
