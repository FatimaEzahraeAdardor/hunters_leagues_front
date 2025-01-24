import {createAction, props} from "@ngrx/store";
import {Page, User} from "../../core/model/common.model";

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
)
