const jwt = require("jsonwebtoken");
const accessTokenSecret = "abcd";

class TokenService {
  /**
   * Generates a new access token based on the provided username.
   *
   * @param {string} username - The username for which the token is generated.
   * @returns {string} The generated access token.
   */
  generateAccessToken(username) {
    // Payload data for the token
    const data = {
      username,
    };

    // Generate the access token using JWT
    const accessToken = jwt.sign(data, accessTokenSecret, {
      expiresIn: "1h", // Token expiration time
    });

    return accessToken;
  }

  /**
   * Verifies the validity of an access token.
   *
   * @param {string} token - The access token to be verified.
   * @returns {object|boolean} The decoded token data if valid, otherwise false.
   */
  async verifyAccessToken(token) {
    try {
      // Verify the token using JWT and the secret key
      return jwt.verify(token, accessTokenSecret);
    } catch (err) {
      // Return false if verification fails
      return false;
    }
  }
}

// Export an instance of the TokenService class
module.exports = new TokenService();
