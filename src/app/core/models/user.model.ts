export class User {
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    profileImage!: string | null;
    isActive!: boolean;
    createdAt!: Date;
    birthDate!: string | null;

    // constructor(
    //     id: string,
    //     firstName: string,
    //     lastName: string,
    //     email: string,
    //     profileImage: string | null,
    //     isActive: boolean,
    //     createdAt: Date,
    //     birthDate: string | null
    // ) {
    //     this.id = id;
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.email = email;
    //     this.profileImage = profileImage;
    //     this.isActive = isActive;
    //     this.createdAt = createdAt;
    //     this.birthDate = birthDate;
    // }
}
