import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { UserService } from '../../core/services/user.service';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {UUID} from "node:crypto";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule], // Add CommonModule here
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: any[] = [];
  currentPage = 0;
  pageSize = 5;
  totalItems = 0;
  form: FormGroup;
  editForm: FormGroup;
  isEditModalOpen = false;
  selectedUser: any = null;

  constructor(private userService: UserService,private fb: FormBuilder,private authService: AuthService) {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      cin: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),

    });
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      nationality: ['', Validators.required],
      password: ['', Validators.required],

    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: (response: any) => {
          console.log("ad user done succefully");
          this.closeModal();

        }

      })
    }
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.users = response.content;
        this.totalItems = response.totalElements;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchUsers();
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  isModalOpen= false;
  openModal = () => {
    this.isModalOpen = true;

  }
  closeModal = () => {
    this.isModalOpen = false;
  }
  deleteUser(userId: UUID): void {
      this.userService.deleteUser(userId).subscribe({
        next: (response: any) => {
          console.log("deleted user", response);
          this.fetchUsers();

        }
      })
  }
  openEditModal(user: any): void {
    this.selectedUser = user;
    console.log('Selected user:', this.selectedUser); // Log the selected user
    this.editForm.patchValue(user);
    console.log('Edit form values:', this.editForm.value); // Log the form values
    this.isEditModalOpen = true;
  }
  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedUser = null;
    this.editForm.reset();
  }

  onUpdate(): void {
    if (this.editForm.valid && this.selectedUser) {
      const updatedUser = { ...this.selectedUser, ...this.editForm.value };
      this.userService.updateUser(this.selectedUser.id, updatedUser).subscribe(
        () => {
          console.log('User updated successfully');
          this.fetchUsers(); // Refresh the user list after update
          this.closeEditModal();
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }





}
