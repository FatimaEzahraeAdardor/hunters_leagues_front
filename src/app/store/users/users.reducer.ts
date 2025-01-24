import {UsersState} from "./users.state";
import {createReducer, on} from "@ngrx/store";
import {loadUserFailure, loadUsers, loadUsersSuccess} from "./users.actions";

export const initialState: UsersState ={
  users : [],
  loading : false,
  error : null,
  totalElements: 0,
  totalPages: 0,
  currentPage: 0,
  pageSize: 5
}
export const usersReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadUsersSuccess, (state,{ data }) => ({
    ...state,
    loading: false,
    users: data.content,
    totalElements: data.totalElements,
    totalPages: data.totalPages
  })),
  on(loadUserFailure, (state,{ error }) => ({
    ...state,
    loading: false,
    error,
  }))
)
