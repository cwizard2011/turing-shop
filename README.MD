
# Turing Online Shop Challenge
Turing Shop- A Sample Ecommerce App that allows users to create an account, add items to cart and make payment.

# Development
The development is broken down into two parts, the server side and the client side. The server side (API/backend) is developed using Express, NodeJs, MySQL and Sequelize ORM for persisting data, and Json Web token for authentication. React framework is used for the frontend

## Installation
1. Ensure [**Node JS**](https://nodejs.org/en/) is installed.
2. Ensure [**Mysql**](https://www.mysql.com/downloads/) is installed.
3. Clone the [**repository here**](https://github.com/cwizard2011/turing-shop.git)
4. Navigate to the project directory `cd  turing-ecommerce-project`
5. Run `npm install` on the terminal to install dependecies
6. Create a .env file in your root directory and copy content from `.env.sample` file to `.env` file and set environment variables with the appropriate values.
7. Create Mysql database and run migrations: `npm run migrations`

Endpoints:
----------

### Authentication:

`POST /api/users/login`

Example request body:

```source-json
{
  "user":{
    "email": "sjuliet@juliet.com",
	"password": "password"
  }
}
```

No authentication required, returns a User

Required fields: `email`, `password`

### Registration:

`POST /api/users`

Example request body:

```source-json
{
  "user":{
    "firstname": "Sjuliet",
	"lastname": "Juliet",
	"email": "sjuliet@juliet.com",
	"password": "juliet1",
	"password_confirmation": "juliet1"
  }
}
```

No authentication required, returns a User

Required fields: `firstname`, `lastname`,  `email`, `password`

### Get All Items

`GET /api/items`

Query Parameters:

Filter by Department:

`?department=Nature`

Filter by Category:

`?category=french`

Search by name of item or item description:

`?search=Arc`

Limit number of items (default is 20):

`?limit=20`


No authentication required, returns a default of ten items per page

### Get a single item

`GET /api/items/<itemId>`

No authentication required, returns a single item object

### Add Item to Shopping Cart

`POST /api/cart`

Example request body:

```source-json
{
  "cart":{
    "productId": "3",
	"attributes": ["XXL", "White"],
	"quantity": 3
  }
}
```

Authentication required, returns the shopping cart object

Accepted fields: `productId`, `attributes`, `quantity`

### Get Customers items in the Shopping Cart

`GET /api/cart`

Authentication required, returns the the shopping cart object

### Update the quantity of an item in the shopping cart

`PUT /api/cart/<cartItemId>`

Example request body

```source-json
{
  "cart":{
	"quantity": 3
  }
}
```

Authentication required, returns the shopping cart updated object

Accepted fields: `quantity`

### Delete an item in the cart

`DELETE /api/cart/<cartItemId>`

Authentication required, deletes an item from the shopping cart

### Update User Profile

`PUT /api/users`
Example request body

```source-json
{
  "user":{
    "address1": "Address",
    "city": "city",
    "region": "region",
    "country": "country"
  }
}
```

Accepted fields: `address1`, `address2`, `city`, `region`, `postalCode`, `country`, `dayPhone`, `evePhone` `mobPhone`, `shippingRegionId`

Authentication required, returns an updated user object

### Get User Profile

`GET /api/users`

Authentication required, returns a user object


