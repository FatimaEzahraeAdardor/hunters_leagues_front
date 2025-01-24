import {User} from "../../core/model/common.model";

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
