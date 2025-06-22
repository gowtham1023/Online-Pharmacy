const User = require('../models/User');

const getUserInfo = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).select('-password');
    if (!user) return res.json({ success: false, message: 'User not found' });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateUser = async (req, res) => {
  const { email, fullName, phone } = req.body;
  try {
    const updated = await User.findOneAndUpdate(
      { email },
      { fullName, phone },
      { new: true }
    ).select('-password');

    res.json({ success: true, user: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getUserInfo, updateUser };
