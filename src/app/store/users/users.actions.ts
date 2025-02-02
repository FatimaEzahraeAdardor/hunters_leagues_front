import {createAction, props} from "@ngrx/store";
import {Page, RegisterPayload, User} from "../../core/model/common.model";

export const loadUsers = createAction(
  '[Users] Load Users',
  props<{ page: number; pageSize: number }>()
);
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ data: Page<User> }>()
);
export const loadUserFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);

export const addUser = createAction(
  '[Users] Add User',
  props<{ payload: RegisterPayload }>()
);


export const addUserSuccess = createAction(
  '[Users] Add User Success',
  props<{ user: User }>()
);

export const addUserFailure = createAction(
  '[Users] Add User Failure',
  props<{ error: string}>()
);

    export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ userId: string }>()
);

export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ userId: string }>()
);

export const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: string }>()
);
