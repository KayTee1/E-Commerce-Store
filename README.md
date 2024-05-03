# React Store

## Description

I developed this full-stack application as the final project for my web application development course.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [License](#license)
- [Contact](#contact)

## Tech Stack

Frameworks and libaries used:

### Frontend

- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: Library for managing routing in React applications.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Tailwind CSS**: Utility-first CSS framework that provides low-level utility classes to quickly build custom designs without having to write custom CSS.
- **Tailwind Merge**: Utility for combining Tailwind CSS classes.
- **React Spinners**: Library for displaying loading spinners or animations.
- **React Icons**: Library for using icons in React applications.

#### Development Dependencies

- **@types/react**: Type definitions for React.
- **@typescript-eslint/eslint-plugin**: ESLint plugin for TypeScript.
- **@typescript-eslint/parser**: Parser for TypeScript in ESLint.
- **@vitejs/plugin-react**: Vite plugin for React support.
- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes.
- **eslint**: Linter for JavaScript and TypeScript.
- **eslint-plugin-react-hooks**: ESLint plugin for enforcing React Hooks rules.

### Backend

- **Node.js**: JavaScript runtime environment that allows you to execute JavaScript code server-side, enabling the development of scalable and efficient web applications.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Bcrypt.js**: Library for hashing passwords.
- **CORS**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **Dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **Jsonwebtoken**: Library for generating and verifying JSON Web Tokens (JWT).
- **MySQL2**: MySQL client for Node.js with focus on performance.
- **UUID**: Library for generating universally unique identifiers (UUIDs).

#### Development Dependencies

- **nodemon**: Utility that monitors for changes in your source code and automatically restarts the server.

### Database

- **MySQL**: Relational database management system based on SQL (Structured Query Language).

## Usage

This app is running and deployed on TAMK virtual machine, to access it you need vpn connection. http://172.16.6.158

### Installing Locally

#### Step 1 Cloning

Clone the repository to your local machine using the following command:

```
git clone git@github.com:TiTe-5G00EV16-3003/2024-final-project-KayTee1.git
```

#### Step 2 Setting up Env Variables

In the project root, run the createEnv.sh script to set up the environment variables for both frontend and backend. If necessary, make the script executable using:

```
chmod +x createEnv.sh
```

Then

```
./createEnv.sh
```

#### Step 3 Launching the App

After the environment files have been successfully created, run the following commands:

```
docker-compose up -d;
cd frontend; npm run dev;
cd backend; npm run dev;
```

#### Step 4 Using it

Open your prefered browser and access the app with localhost:5173

## Documentation

### API

React Store Backend follows the REST (Representational State Transfer) style. This means it uses standard HTTP methods like GET, POST, PUT, and DELETE to perform actions on resources. RESTful APIs provide a straightforward and predictable way to interact with the API, making it easy to integrate into your applications.

#### Available Routes

- Categories
- Favorites
- Products
- Users

### Categories



## Contact

If you have any questions or feedback, feel free to contact me at [truong.kha@outlook.com](truong.kha@outlook.com).
