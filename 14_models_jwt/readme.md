### Models and jwt

#### bcript

- **bcrypt** is a Node.js library that implements the bcrypt hashing algorithm to securely hash and compare passwords. It uses a salt to protect against rainbow table attacks and is designed to be slow and computationally expensive, making it difficult for attackers to crack passwords via brute force.

- **Key Points:**

- Hashing Algorithm: Uses bcrypt algorithm to hash passwords securely.
- Handling: Automatically generates a salt and applies it to the password before hashing.
- Native Code: Depends on native C++ bindings, which makes it faster but requires compilation.
- Security: Built to be resistant to brute-force attacks and rainbow tables.
- Use Case: Ideal for environments where native code can be installed, such as servers with full access.

#### bcriptjs

- bcryptjs is a pure JavaScript implementation of the bcrypt algorithm. It offers the same functionality as bcrypt but is written entirely in JavaScript, making it easier to install in environments where native modules cannot be compiled or used.

- **Key Points:**

- JavaScript Implementation: Pure JS version of bcrypt, making it easier to install and use.
- No Native Code: Does not require native C++ bindings, making it more portable but slower than bcrypt.
- Same Functionality: Provides the same password hashing and comparison capabilities as bcrypt.
- Use Case: Useful in environments where native code cannot be compiled, such as certain serverless platforms or shared hosting.
