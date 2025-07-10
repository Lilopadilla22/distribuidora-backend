const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  console.log('📥 Entró al controlador /register')
  try {
    const {
      nombre,
      apellido,
      email,
      password,
      direccion,
      telefono,
      fecha_cumpleanos,
      cc,
      nombre_negocio,
      role,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      direccion,
      telefono,
      fecha_cumpleanos,
      cc,
      nombre_negocio,
      role: role || 'client'
    });

    const userToReturn = { ...newUser._doc };
    delete userToReturn.password;

    res.status(201).json(userToReturn);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const loginUser = async (req, res) => {
  console.log('🔐 Entró al login');
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      maxAge: 2 * 24 * 60 * 60 * 1000, 
    });

    const userToReturn = { ...user._doc };
    delete userToReturn.password;

    res.json({ user: userToReturn });
  } catch (error) {
    console.error('Error al hacer login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const getProfile = async (req, res) => {
  try {
    console.log('Obteniendo perfil del usuario:', req.user.id);
    
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      message: 'Perfil obtenido exitosamente',
      user
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile
};
