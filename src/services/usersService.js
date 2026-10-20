import User from "../models/userModel.js";

//get all users service
export const getAllUsersService = async () => {
  const users = await User.find({}, "-password").sort({
    createdAt: -1,
  });
  return users;
};

export const updateUserService = async (userId, userData) => {
  const { username, email, firstName, lastName, role, password, status } =
    userData;

  //check if the user exists
  const isUser = await User.findById(userId);
  if (!isUser) {
    throw new Error("User not found");
  }

  //update user
  // Update only provided fields
  if (username) isUser.username = username;
  if (email) isUser.email = email;
  if (firstName) isUser.firstName = firstName;
  if (lastName) isUser.lastName = lastName;
  if (role) isUser.role = role;
  if (status) isUser.status = status;
  if (password) isUser.password = password;

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
};
