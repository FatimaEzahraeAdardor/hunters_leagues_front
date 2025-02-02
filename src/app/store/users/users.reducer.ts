import {UsersState} from "./users.state";
import {createReducer, on} from "@ngrx/store";
import {
  addUser, addUserFailure, addUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  loadUserFailure,
  loadUsers,
  loadUsersSuccess
} from "./users.actions";

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
  })),

on(deleteUserSuccess, (state, { userId }) => ({
  ...state,
  users: state.users.filter(user => user.id !== userId)
})),
  on(deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(addUser, state => ({ ...state, loading: true })),
  on(addUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    users: [...state.users, user],
    totalElements: state.totalElements + 1
  })),
  on(addUserFailure, (state, { error }) => ({ ...state, loading: false, error }))
)
