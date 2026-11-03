const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET = 'mysecretkey';

const users = [
  { username: 'hi', password: '123', role: 'student' },
  { username: 'mam', password: '1234', role: 'faculty' },
  { username: 'admin1', password: 'admin123', role: 'admin' }
];

// LOGIN WALA SECTION
app.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: user.username, role: user.role }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// authentication middleware
function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const token = header.split(' ')[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
  });
}

// role check middleware
function allowRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}

app.get('/dashboard', auth, allowRoles('student', 'faculty', 'admin'), (req, res) => {
  res.json({ message: 'Welcome ' + req.user.username });
});

app.get('/profile', auth, (req, res) => {
  res.json(req.user);
});

app.put('/marks/:studentId', auth, allowRoles('faculty', 'admin'), (req, res) => {
  res.json({ message: 'Marks updated for ' + req.params.studentId });
});

app.delete('/users/:username', auth, allowRoles('admin'), (req, res) => {
  const index = users.findIndex(u => u.username === req.params.username);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(index, 1);
  res.json({ message: 'User deleted' });
});

app.listen(3000, () => console.log('Server running on port 3000'));