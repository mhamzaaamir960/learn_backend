### Custom API Response and Error handling

###### Middleware

- Middleware in backend development, particularly in frameworks like Express.js, is a function that intercepts and processes HTTP requests and responses in a web application. Middleware functions can execute code, modify the request and response objects, end the request-response cycle, or call the next middleware function in the stack.

- In Express.js, you often use app.use() to apply middleware. Here's how it works:

* Request Processing: Middleware can inspect or modify the request before passing it along to the next middleware or route handler.
* Response Handling: Middleware can also modify the response before it is sent back to the client.
* Authentication & Authorization: Middleware is commonly used to check if a request is authenticated before allowing it to proceed to the intended route.
* Error Handling: Middleware can catch and handle errors, sending appropriate responses to the client.
