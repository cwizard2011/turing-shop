import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);
const password = '1234esa2';
const hashedPassword = bcrypt.hashSync(password, salt);

const user = [
  {
    name: 'Peter Adeoye',
    email: 'cwizard@gmail.com',
    password: hashedPassword,
    shipping_region_id: 2
  },
];
export default user;
