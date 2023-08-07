# Node API
🌟Hello there!🌟<br> 
* I've developed this API to seamlessly manage various routes as specified in the assigned task. Powered by the Express backend framework, it effortlessly handles the intricacies of your requests. Underlying it all is the reliable PostgreSQL database, harmoniously integrated through the Sequelize ORM. 
* If you encounter any hurdles while setting up this project, don't hesitate to reach out. 🙌 
## Table of Contents


- [🏗️ Frameworks](#frameworks)
  - [Express.js](#expressjs)
  - [ORM - Sequelize](#orm---sequelize)
  - [Database - Postgres](#database---postgres)
- [📊 Database Schema](#database-schema)
  - [User](#user)
  - [Datastore](#datastore)
- [🚀 Getting API Up and Running](#getting-api-up-and-running)


## Frameworks

###  Express.js

* I chose Express.js as web framework due to its flexibility, this choice allows me to leverage the rich ecosystem of Node.js packages and tools, enabling rapid development.

### ORM - Sequelize 
* I opted for Sequelize as the ORM of choice due to its remarkable simplicity and straightforwardness when it comes to syntax and methods. Its ease of use makes development smoother and more efficient.

### Database - Postgres

* I selected PostgreSQL as the preferred database mainly because Sequelize offers robust support for it, coupled with a wealth of extensive resources online.

## Database Schema

The Database consists of 2 tables, each with its own description. To provide additional clarity, <b>it was my assumption that the key-value pairs should be intricately tied to individual users</b>, owing to the requirement of passing a token within the query. So, user1 and user2 can have the same key names,  but each of them is restricted to holding a maximum of one key individually.

### User

- `username`: Primary key, string
- `email`: Unique string
- `password`: String
- `full_name`: String
- `age`: Integer
- `gender`: Enum ('female', 'male', 'third_gender')

### Datastore

- `id`: Primary key, UUIDv4
- `key`: String
- `value`: String
- `username`: String (foreign key to User)

## Getting API Up and Running

### Prerequisites:
Before you begin, ensure you have the following installed:<br>
* Docker
* Docker Compose 
* Make sure that ```Port 3000``` is free on the host machine.

### Steps to set up and run the API: 
* Clone the GitHub repository using the command: ```git clone https://github.com/Ujjwal-S/node-api```

* Navigate to the repository directory.

* Execute the command to initiate the build process. <i>(Please note that this might take some time) </i>: ```docker-compose up --build```


✨ If  everything is successfully set up ✨, <br> You'll receive a message resembling: "Database connected && App Listening on port 3000". This confirms that the API is operational and ready for use.
