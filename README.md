"Todo's" tests

1. To start tests in docker run command:
-   _docker build -t cypress ._
- NOTE: **The dot at the end of еthe command is also important** 

2. To start API tests based on https://jsonplaceholder.typicode.com resouce
   - run server with command:
     - _json-server employees.js_
       - Open Cypress Test Runner by running script:
         - _cy:open_
    
3. To start UI and basic API tests for "Todo's" app run script:
- _cy:open_
- select spec file to run.