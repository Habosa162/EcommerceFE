import { Component } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../core/models/user.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-user',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent {
  users: User[] = [];
  showModal: boolean = false;
  isEditing: boolean = false;
  currentUserId: string = '';
  newUser: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    profileImage: null,
    isActive: true,
    createdAt: new Date(),
    birthDate: null,
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }


  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }


  openAddUserModal(): void {
    this.isEditing = false;
    this.newUser = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      profileImage: null,
      isActive: true,
      createdAt: new Date(),
      birthDate: null,
    };
    this.showModal = true;
  }


  openEditUserModal(user: User): void {
    this.isEditing = true;
    this.newUser = { ...user };  // Copy user, including id
    console.log('newUser on edit:', this.newUser);  // Check if id is copied correctly
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }


  addUser(): void {
    this.userService.createUser(this.newUser, 'defaultPassword').subscribe((createdUser: User) => {
      this.users.push(createdUser);
      this.closeModal();
    });
  }


  updateUser(): void {
    console.log('Updating user:', this.newUser);  // Check if newUser contains a valid id
    if (!this.newUser.id) {
      console.error('User ID is missing!');
      return;  // Prevent further action if id is missing
    }
  
    this.userService.updateUser(this.newUser.id, this.newUser).subscribe((updatedUser: User) => {
      console.log('Updated user received from API:', updatedUser);  // Check the response from API
      const index = this.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
      this.closeModal();
    });
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter(user => user.id !== userId);
      });
    }
  }
}
