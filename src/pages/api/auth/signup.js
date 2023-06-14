// import connectMongo from '../../../../database/conn';
// import Users from '../../../../model/Schema';
// import { hash } from 'bcryptjs';

// export default async function handler(req, res) {
//   // res.json({ message:"Signup Post Request" })
//   // res.json untuk mengecek apakah sudah bisa membuat request signup untuk menampilkan pesan di browser menggunakan path
//   // localhost:3000/api/auth/signup

//   connectMongo().catch((error) => res.json({ error: 'Connection Failed...!' }));

//   //hanya method post untuk diterima

//   if (req.method === 'POST') {
//     if (!req.body) return res.status(404).json({ error: "Don't have form data...!" });
//     const { username, email, password } = req.body;

//     //cek duplicate users
//     const checkexisting = await Users.findOne({ email });
//     if (checkexisting) return res.status(422).json({ message: 'User Already Exist...!' });

//     //hash password
//     Users.create({ username, email, password: await hash(password, 12) }, function (err, data) {
//       if (err) return res.status(404).json({ err });
//       res.status(201).json({ status: true, user: data });
//     });
//   } else {
//     res.status(500).json({ message: 'HTTP method not valid only POST Accepted' });
//   }
// }

import connectMongo from '../../../../database/conn';
import Users from '../../../../model/Schema';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  try {
    await connectMongo();
  } catch (error) {
    return res.status(500).json({ error: 'Connection Failed...!' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'HTTP method not allowed, only POST is accepted' });
  }

  if (!req.body) {
    return res.status(400).json({ error: 'Request body is missing' });
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: 'User Already Exists' });
    }

    const hashedPassword = await hash(password, 12);
    const newUser = new Users({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    return res.status(201).json({ status: true, user: savedUser });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
