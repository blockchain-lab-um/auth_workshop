// We need to import the library
const jwt = require('jsonwebtoken');

// ------------------- Functions we are going to use -------------------

// Generate JWT token
function generateToken(payload, secret, options) {
    return jwt.sign(payload, secret, options);
}

// Verify JWT token
function verifyToken(token, secret) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return null;
    }
}

// Decode JWT token without verification
function decodeToken(token) {
    return jwt.decode(token);
}

// ----------------- USING SYMMETRIC KEY -----------------

console.log('----------------- USING SYMMETRIC KEY -----------------');

{
    // Secret key to sign the JWT
    const SECRET_KEY = 'your-secret-key';

    // Example payload data
    const payload = {
        userId: 7452,
        username: 'vid',
        role: 'admin',
    };

    // Options for token (e.g., expiration time)
    const options = {
        expiresIn: '1h', // Token expires in 1 hour
    };

    // Generate a token
    const token = generateToken(payload, SECRET_KEY, options);
    console.log('Generated Token:', token);

    // Verify the token (to ensure it's valid and not expired)
    const verifiedPayload = verifyToken(token, SECRET_KEY);
    console.log('Verified Payload:', verifiedPayload);

    // Decode the token without verifying
    const decodedPayload = decodeToken(token);
    console.log('Decoded Payload:', decodedPayload);
}

console.log("------------------------------------");

// ----------------- USING RSA ASYMMETRIC KEY -----------------

console.log('----------------- USING RSA ASYMMETRIC KEY -----------------');

{
    // Import the fs module to read from files
    const fs = require('fs');

    // Read the RSA keys from files
    const rsa_pub = fs.readFileSync('./rsa-public-key.pem');
    const rsa_priv = fs.readFileSync('./rsa-private.pem');

    // Example payload data
    const payload = {
        userId: 7452,
        username: 'vid',
        role: 'user',
    };

    // Generate a token
    const token = generateToken(payload, rsa_priv, { algorithm: 'RS256' });
    console.log('Generated Token:', token);

    // Verify the token (to ensure it's valid and not expired)
    const verifiedPayload = verifyToken(token, rsa_pub);
    console.log('Verified Payload:', verifiedPayload);

    // Decode the token without verifying
    const decodedPayload = decodeToken(token);
    console.log('Decoded Payload:', decodedPayload);
}

console.log("------------------------------------");

// ----------------- EXERCISE -----------------

// Create a JWT token:
// - Use the ECDSA key (elliptic curve) to sign the token (use OpenSSL to generate the keys)
// - Set the following properties to the JWT: expiration date, not before, audience, and two custom claims
