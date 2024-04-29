import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}
export const comparePassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);