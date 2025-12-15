import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (myPlaintextPassword, hash) => {
  console.log(myPlaintextPassword, hash);
   return bcrypt.compareSync(myPlaintextPassword, hash);
};
