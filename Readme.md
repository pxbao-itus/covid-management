# Covid Management
1.Description
- This project is built for web application programming course.
- Manage people related to covid, support users to buy food during covid treatment and isolation. Manage treatment and isolation sites.
2. Hosting
- Project is deployed on Heroku: [https://covid-management-21-22.herokuapp.com]
- Account for testing: 
    - Admin: admin - 123123
    - Manager: tkql_01 - 123456
    - User: 070200006301 - 01012000 

## Clone and start project
- `npm install`
- `npm run dev` start server with dev mode
- `npm start` start server
- Add .env config about PostgresSQL database
- Add .env config about Cloudinary 

## Front End
1. Module
- Views engine __express-handlebars__
- Control __express-handlebars-sections__

## Back End
1. Module
- Framework: __expressjs__
- Local technique: __passport passport-local bcrypt multer express-session__
- Cookie management: __cookie-parser__
- Access database: __pg, pg-promise__
- Import file: __cloudianry datauri__
- Token: __jsonwebtoken https__

## Database
- Local __PostgreSQL__
- Deploy __Heroku Postgres__