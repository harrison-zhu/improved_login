// get inputs from the login form
const form = document.getElementById('loginForm');
const messageBox = document.getElementById('message');

// validate the email for an @ along with the password requirements
function validate(email, password) {
    const errors = [];

    if (email.trim() === '') {
        errors.push('Email is required.');
    } else if (!email.includes('@')) {
        errors.push('Email must contain an "@" character.');
    } else if (/[^A-Za-z0-9_@]/.test(email)) {
        errors.push('Email cannot contain characters other than letters, numbers, underscores, and "@".')
    }

    if (password.trum() === '') {
        errors.push('Password is required.');
    } else {
        if (password.length < 8) {
            errors.push('Password is too short. It should be 8 characters or more');
        }
    }

    return errors;
}

function showMessage(text, isError) {
    messageBox.textContent = text;
    messageBox.className = 'message ' + (isError ? 'error' : 'success');
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // check and ensure email and password are valid
    const clientErrors = validate(email, password);
    if (clientErrors.length > 0) {
        showMessage(clientErrors.join(' '), true);
        return;
    }

    // validation passed so check with server
    try {
        const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.ok) {
        showMessage(data.message, false);
        } else {

        // occurs if not valid password with server
        showMessage(data.errors.join(' '), true);
        }
    } catch (err) {
        showMessage('Could not reach the server.', true);
    }
});