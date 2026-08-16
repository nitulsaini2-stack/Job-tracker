import bcrypt from "bcryptjs";
import db from "../db/db.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Check if user already exists
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });

  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = users[0];

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d",
  }
);

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// import bcrypt from "bcryptjs";
// import db from "../db/db.js";

//  export const register = async (req,res) => {
//     try {
//         const { name, email, password } = req.body;

//         // check required fields
//         if(!name || !email || !password){
//             return res.status(400).json({
//                 message: "name, email and password are required",
//             })
//         }

//         const [existingUser] = await db.query(
//             "SELECT id FROM users WHERE email = ?",
//             [email]
//         );


//             if(existingUser.length > 0){
//                 return res.status(409).json({
//                     message: "Email already registered",
//               })
//             }

//           const hashedPassword = await bcrypt.hash(password,10);

//           const [result] = await db.query(
//             "INSERT INTO users (name, email, password) VALUES (?,?,?)",
//             [name, email, hashedPassword]
//           );

//         return res.status(201).json({
//             message: "User registered successfully",
//             userId: result.insertId,
//         })
//     } catch (error) {
//         console.error("Register error:", error);

//         return res.status(500).json({
//             message: "Internal server error",       
//         })
        
//     }
// }

// export const login = async (req,res) => {
    
//     try{
//       const { email, password } = req.body;

//     // check required fields
//     if(!email || !password){
//         return res.status(400).json({
//             message: "Email and password are required",
        
//         });
//         //find user
//         const [users] = await db.query(
//             "SELECT * FROM users WHERE email = ?",
//             [email]
//         );

//         if(users.length === 0){
//             return res.status(401).json({
//                 message: "Invalid email or password",
//             });
//         }
//         const user = users[0];

//         //compare password
//         const isPasswordValid = await bcrypt.compare(
//             password,
//             user.password
//         );

//         if(!isPasswordValid){
//             return res.status(401).json({
//                 message: "Invalid email or password",
//             });
//         }

//         return res.status(200).json({
//             message: "Login successful",
//             user: {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//             },
//         }); 
        
//       }

//     }catch(error){
//         console.error("Login error:", error);

//         return res.status(500).json({
//             message: "Internal server error",       
//         })
//     }
//   }
