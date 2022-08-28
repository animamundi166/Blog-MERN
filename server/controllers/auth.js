import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({
        message: 'User is busy',
      })
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    })

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    await newUser.save();

    res.json({
      token,
      newUser,
      message: 'Регистрация прошла успешно',
    })

  } catch (error) {
    console.log(error);
    res.json({ message: 'Ошибка при регистрации' });
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: 'Пользователь не найден',
      })
    }

    const isPasswordCorrect = bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: 'Логин или пароль неверны',
      })
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.json({
      token,
      user,
      message: 'Вы вошли в систему',
    })
  } catch (error) {
    res.json({ message: 'Ошибка при логине' });
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: 'Пользователь не существует',
      })
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    )

    res.json({
      user,
      token,
    })

  } catch (error) {
    res.json({ message: 'Нет доступа.' })
  }
}
