# React Store

## Description

I developed this full-stack application as the final project for my web application development course. The project utilizes CI/CD workflows to automate the deployment process.

## Table of Contents

- [Usage](#usage)
  - [Using Locally](#using-locally)
- [Tech Stack](#tech-stack)
- [Documentation](#documentation)
  - [API](#api)
    - [Available Routes](#available-routes)
    - [Product's Endpoints](#products-endpoints)
    - [Users Endpoints](#users-endpoints)
    - [Categories Endpoints](#categories-endpoints)
    - [Favorite's Endpoints](#favorites-endpoints)
- [Summary](#summary)
  - [Challenges](#challenges)
  - [Requirements](#requirements)
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

### Using Locally

#### Step 1 Cloning

Clone the repository to your local machine using the following command:

```
git clone git@github.com:TiTe-5G00EV16-3003/2024-final-project-KayTee1.git
```

#### Step 2 Setting up Environment Variables

In the project root, run the createEnv.sh script to set up the environment variables for both frontend and backend. If necessary, make the script executable using:

```
chmod +x createEnv.sh
```

Next

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

#### Step 4 Testing it

Open your preferred browser and access the app with localhost:5173

## Documentation

### API

The React Store Backend follows the REST (Representational State Transfer) style, utilizing standard HTTP methods such as GET, POST, PUT, and DELETE to interact with resources. RESTful APIs provide a straightforward and predictable way to interact with the API, making it easy to integrate into your applications.

#### Available Routes

- Products
- Categories
- Favorites
- Users

### Product's Endpoints

##### **GET** List of Products

```
/api/products/
```

Returns an array of Products sorted by ID. Example return array:

```
[
  {
    "id": 2,
    "product_id": "55o",
    "title": "IPhone X",
    "description": "Brand new Iphone",
    "price": "1000.00",
    "owner": "testman",
    "image": "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg",
    "created": "2024-05-03T16:03:18.000Z",
    "updated": "2024-05-03T16:03:18.000Z"
  }
]
```

##### **GET** Retrieve details for a specific product.

```
/api/products/product/:product_id
```

Returns an object of a product based on product_id.
Example return object:

```
{
  "id": 2,
  "product_id": "55o",
  "title": "IPhone X",
  "description": "Brand new Iphone",
  "price": "1000.00",
  "owner": "testman",
  "image": "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg",
  "created": "2024-05-03T16:03:18.000Z",
  "updated": "2024-05-03T16:03:18.000Z",
  "categories": [
    {
      "id": 1,
      "category_id": "001",
      "name": "Electronics",
      "created_at": "2024-05-03T14:04:12.000Z",
      "updated_at": "2024-05-03T14:04:12.000Z"
    }
  ]
}
```

#### **GET** Array of products based on category_id

```
/api/products/category/:category_id
```

Returns an array of products based on category_id. Example return array:

```
[
  {
    "id": 2,
    "product_id": "55o",
    "title": "IPhone X",
    "description": "Brand new Iphone",
    "price": "1000.00",
    "owner": "testman",
    "image": "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg",
    "created": "2024-05-03T16:03:18.000Z",
    "updated": "2024-05-03T16:03:18.000Z"
  }
]
```

##### **POST** a new Product

```
/api/products
```

Example post request body:

```
{
  "product_id": "sgj",
  "title": "Iphone 12",
  "description": "The latest Iphone",
  "price": "1000",
  "image": "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg",
  "owner": "XiaoLing",
  "categories": [
        {
            "category_id": "as1", "name": "Category1"
        }
    ]
}
```

This will return the product_id: "sgj"

##### **PUT** Updating an existing Product

```
/api/products/:product_id
```

Example request body:

```
{
  "product_id": "sgj",
  "title": "Smart Watch",
  "description": "Sleek Smart Watch",
  "price": "99",
  "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "owner": "XiaoLing",
  "categories": [
        {
            "category_id": "001", "name": "Electronics"
        }
    ]
}
```

This will return a response object of:

```
{
    "message": "Product updated",
    "status": 200
}
```

##### **DELETE** an existing Product

```
/api/products/:product_id
```

This will return a response object of:

```
{
    "message": "Product deleted",
    "status": 200
}
```

### Users Endpoints

#### **GET** Array of products posted by a specific user

```
/api/users/listings/:username
```

This will return an array of products posted by the user. Example return array:

```
[
  {
    "id": 6,
    "product_id": "reD",
    "title": "Headphones",
    "description": "Nice headphones",
    "price": "80.00",
    "owner": "TestUser",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "created": "2024-05-03T17:19:30.000Z",
    "updated": "2024-05-03T17:19:30.000Z"
  }
]
```

#### **POST** User Registration

```
/api/users/signup
```

Example registration post body:

```
{
    "username": "TestUser",
    "email": "test@user.com",
    "password": "password"
}
```

This will return a response object of:

```
{
    "userId": "9eb8a919-bac7-4cb7-b7ad-b1cd165f2310",
    "username": "TestUser",
    "email": "test@user.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWI4YTkxOS1iYWM3LTRjYjctYjdhZC1iMWNkMTY1ZjIzMTAiLCJlbWFpbCI6InRlc3RAdXNlci5jb20iLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzE0NzY3Mzc4LCJleHAiOjE3MTQ3NzA5Nzh9.TIRzk40leOCErbwaR-t3bsuPoZdiSh3yKSrdroDCOpc"
}
```

#### **POST** User Login

```
/api/users/login
```

Example user login post body:

```
{
    "email": "test@user.com",
    "password": "password"
}
```

This will return a response object of:

```
{
  "userId": "9eb8a919-bac7-4cb7-b7ad-b1cd165f2310",
  "username": "TestUser",
  "email": "test@user.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZWI4YTkxOS1iYWM3LTRjYjctYjdhZC1iMWNkMTY1ZjIzMTAiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiZW1haWwiOiJ0ZXN0QHVzZXIuY29tIiwiaWF0IjoxNzE0NzY3ODI4LCJleHAiOjE3MTQ3NzE0Mjh9.FiBQM_k7D28Yfp2wl5g8JpQgGTVufiGACGQ9pqzQljs"
}
```

### Categories Endpoints

#### **GET** Array of categories

```
/api/categories/
```

Returns an array of categories ordered by IDs. Example return array:

```
[
  {
    "id": 1,
    "category_id": "001",
    "name": "Electronics",
    "created_at": "2024-05-03T14:04:12.000Z",
    "updated_at": "2024-05-03T14:04:12.000Z"
  }
]
```

#### **GET** Retrieve a specific category based on a category_id

```
/api/categories/:category_id
```

Returns a category object based on category_id. Example response object:

```
{
  "id": 9,
  "category_id": "999",
  "name": "Test Category",
  "created_at": "2024-05-03T16:34:20.000Z",
  "updated_at": "2024-05-03T16:34:20.000Z"
}
```

#### **POST** a new category

```
/api/categories/
```

Posts a new Category. Example post request body:

```
{
    "category_id": "8df",
    "name": "Example Category"
}
```

This will return the posted category object.

### Favorite's Endpoints

#### **GET** an array of favorite products based on user_id

```
/api/favorites/:user_id
```

Returns an array of favorites based on user_id. Example response array:

```
[
    {
        "id": 1,
        "user_id": "aa46b059-bfc0-4eb6-8541-20dd76fdf684",
        "product_id": "55o",
        "created_at": "2024-05-03T16:38:32.000Z"
    }
]
```

#### **POST** a new entry in the Junction Table

```
/api/favorites
```

Creates a new entry in the junction table associating a user ID with a product ID. Example request body:

```
{
    "user_id": "aa46b059-bfc0-4eb6-8541-20dd76fdf684",
    "product_id": "Gj8"
}
```

Returns a response object like so:

```
{
    "user_id": "aa46b059-bfc0-4eb6-8541-20dd76fdf684",
    "product_id": "Gj8",
    "id": 3
}
```

#### **DELETE** an entry in the Junction Table

Deletes the specified relationship from the junction table. Example request body:

```
{
    "user_id": "aa46b059-bfc0-4eb6-8541-20dd76fdf684",
    "product_id": "Gj8"
}
```

Upon successful deletion, returns a response object:

```
{
    "message": "Favorite deleted successfully",
    "status": 200
}
```

## Summary

The idea of this project was to make a full stack functioning online marketplace that would be deployed on the TAMK Virtual Machine server. I learned a lot while developing this app. To name a few skills that definitely leveled up were:

- SQL (relational databases)
- CSS
- Separating concerns
- CI/CD
- Error Handling and Debugging
- Documentation Writing

### Challenges

- **Dynamic Grid Layout**. I encountered difficulty in dynamically adjusting the number of columns in the grid layout to accommodate varying screen sizes and product card quantities. Overcame it by searching for solutions online and reading tailwind docs and realising that I could get the screen size with the ```window.innerWidth``` property in JavaScript.

- **Time Management**. I underestimated the time required for debugging and implementing new features. As the deadline approached, I found myself overwhelmed. Fortunally we got extra time for the assignment, which helped me polish and finalize this application even further.

### Requirements

The React Store application meets the following requirements:

- **User Authentication**: Users can create accounts, log in, and log out.

- **CRUD-operations**: Users can create, read, edit, and delete listings for items they want to sell.
- **Listing View and Search**: Users can view all listings, view specific listings, view their own listings, and search for items based categories.
- **Site Navigation**: The application provides site navigation functionality.

- **Extra**: Implemented a favorites functionality that allows users to mark products as favorites and view their personalized list of favorited items.


## Contact

If you have any questions or feedback, feel free to contact me at [truong.kha@outlook.com](truong.kha@outlook.com).

