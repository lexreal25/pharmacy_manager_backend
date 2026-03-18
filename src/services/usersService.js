  import User from "../models/userModel.js";

  //get all users service
  export const getAllUsersService = async () => {
    const users = await User.find({}, "-password").sort({
      createdAt: -1,
    });
    return users;
  };

  export const updateUserService = async (userId, userData) => {
    const { username, email, firstName, lastName, role, password } = userData;
    //check if the user exists
    const isUser = await User.findById(userId);
    if (!isUser) {
      throw new Error("User not found");
    }
    
    //update user
    //const allowedFields = ["username", "email", "firstName", "lastName", "role", "password"];


    username && (isUser.username = username);
    email && (isUser.email = email);
    firstName && (isUser.firstName = firstName);
    lastName && (isUser.lastName = lastName);
    role && (isUser.role = role);
    password && (isUser.password = password); //will be hashed in pre save middleware

    const updateUser = await isUser.save();
    const { password: pw, ...updatedUser } = updateUser.toObject();

    return updatedUser;
  };

  //delete user service

  export const deleteUserService = async (userId) => {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("User not found");
    }

    return deletedUser;
  };s
