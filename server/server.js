const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// serves the frontend client
app.use(express.static(path.join(__dirname, '..', 'client')));


// double checks email and password are valid
function validateCredentials(email, password) {
  const errors = [];

  if (typeof email !== 'string' || email.trim() === '') {
    errors.push('Email is required.');
  } else if (!email.includes('@')) {
    errors.push('Email must contain an "@" character.');
  } else if (/[^A-Za-z0-9_@.]/.test(email)) {
    errors.push('Email cannot contain characters other than letters, numbers, underscores, "@", or periods.');
  }

  if (typeof password !== 'string' || password === '') {
    errors.push('Password is required.');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
  }

  return errors;
}

// ---- Login endpoint --------------------------------------------------------
app.post('/login', (req, res) => {
  const { email, password } = req.body || {};

  const errors = validateCredentials(email, password);

  if (errors.length > 0) {
    // 400 Bad Request: the submitted data failed validation.
    return res.status(400).json({ ok: false, errors });
  }

  // Validation passed. This demo does not authenticate against a user
  // store (no database); the assignment scope is input validation, not
  // credential verification. A real app would look up the user here.
  return res.status(200).json({
    ok: true,
    message: `Server accepted the login attempt for ${email}.`,
  });
});

app.listen(PORT, () => {
  console.log(`Login demo running at http://localhost:${PORT}`);
});