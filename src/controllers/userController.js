import {
  getAllUsersService,
  updateUserService,
} from "../services/usersService.js";

//fetch users data
export const fetchUsersController = async (req, res) => {
  try {
    const allUsers = await getAllUsersService(req.body);
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const updatedUser = await updateUserService(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
