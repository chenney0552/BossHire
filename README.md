# BossHire
 A React mobile application like LinkedIn for publishing jobs for Boss and Candidates that allows them to chat and schedule interviews.

## Project Description

This is a H5 SPA mobile application which adpot Frontend-Backend Separation Architecture which includes the frontend and backend application.

### The application includes the following modules:

1. user registration and login
2. candidate and boss list
3. Realtime chat

#### The tech stack for the frontend application includes:

    React, ES6 and Webpack, Bible

    Data visualization, interaction and comonents:

    react, react-router-dom, redux, antd-mobile

    Communication with backend:

    axios, async/await, postman

    Unit testing:

    Eslint, Jest

#### The tech stack for the backend application includes:

    Node.js, Express, MongoDB, Socket.io

#### Other tools:

    blueimp-md5, js-cookie, rc-queue-anim


### Detailed router design:

Router:

1. register: /register register.jsx
2. login: /login login.jsx
3. main: /main main.jsx

second-level router for main:

1. boss: /laoban laoban.jsx

2. candidate: /dashen dashen.jsx

3. message: /message message.jsx

4. personal: /personal personal.jsx

5. boss info: /laobaninfo laobaninfo.jsx

6. candidate info: /dasheninfo dasheninfo.jsx

7. chat: /chat/:userid chat.jsx

### Deploy to Azure:

1. Create Azure virtual machine
2. Ip is 172.174.233.80
3. Run the build
4. Please visit http://172.174.233.80:3000 for demo