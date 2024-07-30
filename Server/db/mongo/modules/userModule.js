const UserModel = require("../../../models/user");
const { errorMessages } = require("../../../utils/messages");
const { GenerateAvatarImage } = require("../../../utils/imageProcessing");

const DUPLICATE_KEY_CODE = 11000; // MongoDB error code for duplicate key
const { ParseBoolean } = require("../../../utils/utils");

/**
 * Insert a User
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<UserModel>}
 * @throws {Error}
 */
const insertUser = async (req, res) => {
  try {
    const userData = { ...req.body };
    if (req.file) {
      // 1.  Save the full size image
      userData.profileImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };

      // 2.  Get the avatar sized image
      const avatar = await GenerateAvatarImage(req.file);
      userData.avatarImage = avatar;
    }
    console.log(userData);
    const newUser = new UserModel(userData);
    await newUser.save();
    return await UserModel.findOne({ _id: newUser._id })
      .select("-password")
      .select("-profileImage"); // .select() doesn't work with create, need to save then find
  } catch (error) {
    if (error.code === DUPLICATE_KEY_CODE) {
      throw new Error(errorMessages.DB_USER_EXISTS);
    }
    throw error;
  }
};

/**
 * Get User by Email
 * Gets a user by Email.  Not sure if we'll ever need this except for login.
 * If not needed except for login, we can move password comparison here
 * Throws error if user not found
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<UserModel>}
 * @throws {Error}
 */
const getUserByEmail = async (req, res) => {
  try {
    // Need the password to be able to compare, removed .select()
    // We can strip the hash before returing the user
    const user = await UserModel.findOne({ email: req.body.email }).select(
      "-profileImage"
    );
    if (user) {
      return user;
    } else {
      throw new Error(errorMessages.DB_USER_NOT_FOUND);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Update a user by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<UserModel>}
 * @throws {Error}
 */

const updateUser = async (req, res) => {
  const candidateUserId = req.params.userId;

  try {
    const candidateUser = { ...req.body };
    // ******************************************
    // Handle profile image
    // ******************************************

    if (ParseBoolean(candidateUser.deleteProfileImage) === true) {
      candidateUser.profileImage = null;
      candidateUser.avatarImage = null;
    } else if (req.file) {
      // 1.  Save the full size image
      candidateUser.profileImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };

      // 2.  Get the avaatar sized image
      const avatar = await GenerateAvatarImage(req.file);
      candidateUser.avatarImage = avatar;
    }

    // ******************************************
    // End handling profile image
    // ******************************************

    const updatedUser = await UserModel.findByIdAndUpdate(
      candidateUserId,
      candidateUser,
      { new: true } // Returns updated user instead of pre-update user
    )
      .select("-password")
      .select("-profileImage");
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a user by ID
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Promise<UserModel>}
 * @throws {Error}
 */
const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error(errorMessages.DB_USER_NOT_FOUND);
    }
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
      .select("-password")
      .select("-profileImage");
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  insertUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getAllUsers,
};
