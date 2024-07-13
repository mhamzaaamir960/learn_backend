# Learn Nodejs 



* Nodejs is a run time environment of the javascript.
- Nodejs follows a single threaded model. Means that it executes one operation at a time.
- Nodejs uses event loop to perform non-blocking I/O operations. It uses event driven architecture where operations are handled asynchronously.
- Nodejs uses non-blocking feature for handling I/O operations asynchronously. Instaed of waiting for an I/O operation to complete. It uses callbacks, promises or async/await to handle the response when its ready.
- Nodejs follows non-buffering, its best for memory efficiency, scalability and latency reduction due it processes in chunks instead of waiting for the entire data set to be recieved before processing.




### Global 
   * "Global" is general keyword in node js to access the variables and functions anywhere in the node js application. like in the browser the general keyword is "window" object and in the node environment we use the "global" keyword to access the variables and functions


### Process
   * "process" object is a global object in nodejs that provides information and control over the current nodejs process. The "process" object provides access to various properties and methods which allows you to interect with the running nodejs application and the environment its running in.


##### Key properties and methods

   - (process.argv) => Its returs an array and the index 0 element is address of node js executable and process.argv[1] is the path of the current file in the project which is executed. And after that which arguments we will after index 2 are added in the process.argv array. the arguments are passed after file name which is for execution.

     






