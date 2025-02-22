// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();


// Secret key for JWT
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Load users from JSON file
const usersFilePath = path.join(__dirname, 'users.json');
let usersData = JSON.parse(fs.readFileSync(usersFilePath));

// Register Route
app.post('/api/register', async (req, res) => {
  console.log('Request Body:', req.body); // Log the request body

  const { username, password } = req.body;
  
  // Validate input
  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  // Check if user already exists
  const existingUser = usersData.users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).send('Username already exists.');
  }

try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add new user
    const newUser = {
      id: usersData.users.length + 1,
      username,
      password: hashedPassword,
    };
    usersData.users.push(newUser);

    // Save updated data to JSON file
    fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));

    res.status(201).send('User registered successfully.');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal server error.');
  }
});
  

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = usersData.users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).send('Invalid credentials.');
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send('Invalid credentials.');
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Protected Route (Example)
app.get('/api/dashboard', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access denied.');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.send(`Welcome to the dashboard, User ID: ${decoded.userId}`);
  } catch (err) {
    res.status(401).send('Invalid token.');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});