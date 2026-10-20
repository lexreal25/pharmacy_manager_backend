import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const encryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (plainPassword, hash)=>
  {
  return await bcrypt.compare(plainPassword, hash);
};

// import bcrypt from "bcrypt";
// const saltRounds = 10;

// export const hashedPassword = (password) => {
//   const salt = bcrypt.genSaltSync(saltRounds);
//   return bcrypt.hashSync(password, salt);
// };

// export const comparePassword = (plain, hashed) => {

//   return bcrypt.compareSync(plain, hashed);
// };
