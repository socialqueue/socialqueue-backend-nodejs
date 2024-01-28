# socialqueue-backend-nodejs

---
---

# docs

- aws-s3-sdk-js: https://aws.amazon.com/sdk-for-javascript

- bcrypt: https://www.npmjs.com/package/bcrypt

- body-parser: https://expressjs.com/en/resources/middleware/body-parser.html

- dotenv: https://www.npmjs.com/package/dotenv#-documentation

- express: https://expressjs.com/en/starter/hello-world.html

- express-validator: https://express-validator.github.io/docs

- jsonwebtoken: https://www.npmjs.com/package/jsonwebtoken

- mongodb: https://www.mongodb.com/docs/drivers/node/v6.3

- mongoose: https://mongoosejs.com/docs/api/mongoose.html

- multer: https://www.npmjs.com/package/multer

- multer-s3: https://www.npmjs.com/package/multer-s3

- mysql2: https://sidorares.github.io/node-mysql2/docs

- nodemailer: https://nodemailer.com/usage

- node-schedule: https://www.npmjs.com/package/node-schedule

- redis: https://redis.io/docs/connect/clients/nodejs

- s3-proxy: https://www.npmjs.com/package/s3-proxy

- sequelize: https://sequelize.org/docs/v6/getting-started

---
---

# database

## users
id  BIGINT NOT NULL AUTO INCREMENT PRIMARY KEY \
firstName   STRING   NOT NULL \
lastName    STRING    DEFAULT(NULL) \
mobile  STRING  DEFAULT(NULL) \
email   STRING   NOT NULL \
passwordHash    STRING    NOT NULL \
lastLogin   DATE    DEFAULT(NULL)

## channels
id  BIGINT NOT NULL AUTO INCREMENT PRIMARY KEY \
platform    STRING  NOT NULL \
userName    STRING  NOT NULL \
accessToken    STRING  NOT NULL \
refreshToken    STRING  NOT NULL \
userId  BIGINT  NOT NULL    FOREIGN KEY REFERENCES(users)

## posts
id  BIGINT NOT NULL AUTO INCREMENT PRIMARY KEY \
scheduledTime   STRING  NOT NULL \
status  STRING  NOT NULL \
channelId  BIGINT  NOT NULL    FOREIGN KEY REFERENCES(channels)

## postAnalytics
id  BIGINT NOT NULL AUTO INCREMENT PRIMARY KEY \
views   BIGINT  DEFAULT(0) \
likes   BIGINT  DEFAULT(0) \
comments    BIGINT  DEFAULT(0) \
shares  BIGINT  DEFAULT(0) \
engagementMetrics   BIGINT  DEFAULT(0) \
postId  BIGINT  NOT NULL    FOREIGN KEY REFERENCES(posts)





---
---

# secrets

## MongoDB Cloud

URI `mongodb+srv://testuser:testuser-123@cluster0.zj1rbah.mongodb.net/?retryWrites=true&w=majority`

Database `cluster0`

Host `cluster0.zj1rbah.mongodb.net`

Port `13353`

User `testuser`

Password `testuser-123`

---

## Aiven MySQL

URI `mysql://avnadmin:AVNS_nzVyBTCavZwgZJQSfmC@mysql-3fce6308-socialqueue.a.aivencloud.com:13353/defaultdb?ssl-mode=REQUIRED`

Database `defaultdb`

Host `mysql-3fce6308-socialqueue.a.aivencloud.com`

Port `13353`

User `avnadmin`

Password `AVNS_nzVyBTCavZwgZJQSfmC`

---

## Aiven Redis

URI `rediss://default:AVNS__lZyx5t-OzgDg3WkYKX@redis-2b7512c0-socialqueue.a.aivencloud.com:13354`

Host `redis-2b7512c0-socialqueue.a.aivencloud.com`

Port `13354`

User `default`

Password `AVNS__lZyx5t-OzgDg3WkYKX`


