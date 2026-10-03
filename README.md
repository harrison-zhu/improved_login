# improved_login

# Login Form with Client-Side and Server-Side Validation

A basic login page improving on OWASP Juice Shop built that prevents 
common cybersecurity threats like SQL injection through login inputs 
that were present on the original login page.

## What it does

The page has an email and password field. Every time an email and 
password is submitted the client and server both check to ensure that 
the email and password enetered are the correct format. Additionally, 
the server should then check if the email and password combination 
exists, but there is no database set up for this small demo.

- **Email** Should contain at least one "@" symbol and only accepts 
    letters, numbers, underscores, periods, and "@" symbols. Also, 
    the email field cannot be empty of filled with whitespace.
- **Password** Should be over 8 characters long and not be empty or 
    filled with whitespace. Additionally, passwords cannot contain 
    whitespace within them.


## Requirements

- [Node.js](https://nodejs.org/) (v18 or newer)
- Express (installed via npm, see below)

## How to run

From the project root:

```bash
# 1. Install dependencies (creates package.json + node_modules)
npm init -y
npm install express

# 2. Start the server
node server/server.js

# 3. Open the app in your browser
#    http://localhost:3000
```

The terminal will print `Login demo running at http://localhost:3000` and
stay running. Leave it open; press Ctrl+C to stop.

## Testing server-side validation

Client-side validation is visible in the browser: submit a bad input and
an error appears instantly without contacting the server.

To prove the **server** validates independently, bypass the browser and
send a request directly. The server still rejects invalid input:

```bash
curl -i -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"bad!chars","password":"weak"}'
```

This returns `400 Bad Request`. A valid request returns `200 OK`:

```bash
curl -i -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test_user@example.com","password":"Password1!"}'
```

## Additional Notes

This login page is not perfect and still has multiple vulnerabilities 
to it. However, it improves upon some major underlying issues with the 
OWASP Juice Shop login page like not parsing inputs and directly 
concatenating the inputs for a SQL query.