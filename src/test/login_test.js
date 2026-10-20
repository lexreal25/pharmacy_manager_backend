import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const testLogin = async () => {
//   const password ="Lex12345";

//   const hash ="$2b$10$Q22o8BNewmGGaJfw1DenjOAfb6BdRm0Av2cz1pB5beXtnYtI3JAKe"

//   console.log("New hash:", hash);
//    const result = await bcrypt.compare(password, hash);

//   console.log("Match:", result);

// const user = await User.findOne({
//   email: "nov@gmail.com",
// });

// const result = await bcrypt.compare(
//   "Lex12345",
//   user.password
// );

// console.log(result);


const password = "Lex@_12345";

const hashedPassword = await bcrypt.hash(password, 10);

console.log("Hash:", hashedPassword);

await User.updateOne(
  { email: "loon@gmail.com" },
  {
    $set: {
      password: hashedPassword,
    },
  }
);

console.log("Password updated");

process.exit();
};
