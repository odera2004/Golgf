### Golf Games Website

### Author: Eugine Odhiambo Odera

## Description:

- This project is a Golf Tournament Management System that allows users to manage golf tournaments and provide information about events through a user-friendly interface. This system will support CRUD operations for all entities and provide an overview of relationships, such as which players are registered for specific tournaments.

## Problem Statement:

- Managing golf tournaments can be cumbersome and inefficient without a proper management system. This can lead to:

- Data redundancy and errors.

- Difficulty in tracking relationships between players and tournaments.

- Limited ability to search, update, or organize information efficiently.

## Solution:

- Develop a CRUD-based Golf Tournament Management System that allows users to efficiently manage tournaments and players. The system will provide:

- Structured data management: This will help align the relationships.

- CRUD operations: Easy-to-use functions for creating, viewing, updating, and deleting entries.

- Relationships tracking: Associate players with tournaments and maintain data integrity.

## Table Relationships:

# Tournament and Players: Many-to-many relationship

- A tournament can have many players registered.

- A player can register for multiple tournaments.

- Implemented through a junction table (i.e., tournament_id, player_id).

# User Stories:

# Tournament Management:

- Add a new tournament by providing its name, date, and location.

- View a list of all upcoming tournaments, including their details.

- Update an existing tournament’s details, such as name, date, and location.

- Delete a tournament by its ID.

# Player Management:

- Add a new player by providing their name, date of birth, and location.

- View a list of all registered players, including their details.

- Update an existing player’s details, such as name, date of birth, and location.

- Delete a player by their ID.

- Enables the user to log in and log out of any tournament.

# Technologies Used:

- SQLAlchemy: ORM for interacting with the database.

- Alembic: For database migrations.

- SQLite: Lightweight database for development.

- Python: Programming language for the application logic.

# LICENSE:

 -This project is licensed under the MIT License - see the LICENSE file for details.

 ## Live Link
 https://golftournment.vercel.app

## Project recording
## 1st recording
https://www.loom.com/share/8f120d540949430e849bad3dfb092a6a?sid=1ca21740-3058-44ef-8031-fcf1184733fd

# ending
https://www.loom.com/share/5fc1e8a8f04e4045bb486a1a28ae82e7?sid=ba103dcc-aa0b-4ef7-bc54-ac563f9356ef
