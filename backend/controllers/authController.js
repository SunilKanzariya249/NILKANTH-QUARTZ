import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Get admin credentials from environment or use secure defaults
const getAdminCredentials = () => {
  const email = process.env.ADMIN_EMAIL || 'admin@gmail.com';
  // If no password is set, use the secure default: "NilkanthAdmin2026!"
  const password = process.env.ADMIN_PASSWORD || 'sunil';
  return { email, password };
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = getAdminCredentials();

    // Verify email (case-insensitive)
    if (email.toLowerCase() !== admin.email.toLowerCase()) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    // Hash password from env/default on-the-fly to compare, or compare directly.
    // For environment variable security, we will use bcryptjs to compare.
    const salt = await bcrypt.genSalt(10);
    const hashedAdminPassword = await bcrypt.hash(admin.password, salt);
    const isMatch = await bcrypt.compare(password, hashedAdminPassword);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
