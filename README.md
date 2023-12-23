# SOUQ 3QAZ (API DOC)

## All Apis starts with http://127.0.0.1:3000

# =====================================

## Get All Products

### Api Route

`Endpoint : 'GET /api/v1/product'`
`Authorization: No Auth Needed`

### Request Example:

```json
No Body Needed
```

### Response Example:

```json
{
  "status": "success",
  "count": 1,
  "products": [
    {
      "id": 5,
      "image": "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/main-image/2020/05/08/2096631-814127042.jpg?itok=RZmIbcc9",
      "name": "mfmdslkbbfnhj",
      "prerelease": true,
      "price": 4561.5,
      "description": "elsisi r2esy",
      "quantity": 1,
      "sellerid": 3,
      "putdate": "2023-12-15T05:28:17.000Z",
      "category": "Health",
      "storedin": 1,
      "sellerFName": "new",
      "sellerLName": "newF"
    }
  ]
}
```

## Get Product By Id

### Api Route

`Endpoint : 'GET /api/v1/product/{id}'
Authorization: No Auth Needed`
`Authorization: No Auth Needed`

### Request Example:

`Endpoint Ex: 'GET /api/v1/product/7'`

```json
No Body Needed
```

### Response Example:

```json
{
  "status": "success",
  "products": [
    {
      "id": 5,
      "image": "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/main-image/2020/05/08/2096631-814127042.jpg?itok=RZmIbcc9",
      "name": "mfmdslkbbfnhj",
      "prerelease": true,
      "price": 4561.5,
      "description": "elsisi r2esy",
      "quantity": 1,
      "sellerid": 3,
      "putdate": "2023-12-15T05:28:17.000Z",
      "category": "Health",
      "storedin": 1,
      "sellerFName": "new",
      "sellerLName": "newF"
    }
  ]
}
```

### OR

```json
{
  "status": "fail",
  "message": "no product found by this id"
}
```

## SignUp user

### Api Route

`Endpoint : 'Post /api/v1/user/signup'`
`Authorization: No auth needed`

### Request Example:

`Endpoint Ex: 'Post /api/v1/user/signup'`

### Headers

```json
headers
{
}
```

### Body

```json
{
  "FName": "new",
  "LName": "newF",
  "PhoneNumber": "01204747568",
  "Email": "one@g.c",
  "Password": "Password123456",
  "Gender": "Male",
  "ApartmentNumber": 1,
  "BuildingNumber": 1,
  "Country": "om eldonia",
  "City": "cairo",
  "Street": "shoubra",
  "role": "Customer", //enum of {'Seller','Customer'}
  "NId": "189465" // is required only in case of Customer
}
```

### Response Example:

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzgsImlhdCI6MTcwMjA4MDQxMiwiZXhwIjoxNzA5ODU2NDEyfQ.BfQ9aocaz_SKkeCj8ZUwyM-eyuGTUYdPpzDJuAyCADY",
  "user": {
    "id": 78,
    "firstname": "new",
    "lastname": "newF",
    "phonenumber": "01204747568",
    "image": "default address",
    "balance": 0,
    "email": "onebgbfbi@g.c",
    "password": "$2b$12$1WzBorVdAY2xIVPfXd/f5u7XEk7ZDtDM/v16rxhsL0d48F6I2YE5C",
    "theme": "Light",
    "banned": false,
    "gender": "Male",
    "apartmentnumber": 1,
    "buildingnumber": 1,
    "country": "om eldonia",
    "city": "cairo",
    "street": "shoubra",
    "passwordchangedat": "2023-12-09T00:06:52.000Z",
    "passwordresettoken": "3165494",
    "passwordresetexpires": "2023-12-09T00:06:52.000Z"
  }
}
```

### OR

```json
{
    "status": "fail",
    "message": "some required Fields are empty"
}
{
    "status": "fail",
    "message": "You Already Have Done This Before"
}
{
    "status": "fail",
    "message": "Phone number must only contain numerical digits"
}
```

## LogIn User

### Api Route

`Endpoint : 'Post /api/v1/user/login'`
`Authorization: No auth needed`

### Request Example:

`Endpoint Ex: 'Post /api/v1/user/login'`

### Headers

```json
headers
{
}
```

### Body

```json
{
  "email": "bishoy@gmail.com",
  "password": "Password123456"
}
```

### Response Example:

```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODcsImlhdCI6MTcwMjA4NDgzNiwiZXhwIjoxNzA5ODYwODM2fQ.5AYXchGt1dIYMmplY_fX3jyuYlHMGcieJaFWB-twKG4",
  "user": {
    "id": 12,
    "firstname": "new",
    "lastname": "newF",
    "phonenumber": "01204747568",
    "image": "default address",
    "balance": 0,
    "email": "customerrkn@ggfdv.com",
    "password": "$2b$12$DtnLXRcP7JPD0yX4oRW5f.l7QU9GoCp1LBM60PWeYeTmI9D7Pow56",
    "theme": "Light",
    "banned": false,
    "gender": "Male",
    "appartmentnumber": -1,
    "buildingnumber": 1,
    "country": "om eldonia",
    "city": "cairo",
    "street": "shoubra",
    "passwordchangedat": "2023-12-22T23:00:37.000Z",
    "passwordresettoken": "3165494",
    "passwordresetexpires": "2023-12-22T23:00:37.000Z"
  },
  "role": "Customer"
}
```

### OR

```json
{
    "status": "fail",
    "message": "incorrect email or password"
}
{
    "status": "fail",
    "message": "please provide email & password"
}
{
    "status": "error",
    "message": "something went wrong"
}
```

## Add Product

### Api Route

`Endpoint : 'Post /api/v1/product'`
`Authorization: Bearer JWT (for a Seller not Customer)  As a Header in Req`

### Request Example:

`Endpoint Ex: 'Post /api/v1/product'`

### Headers

```json
headers
{
	Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNjE3NDQ2LCJleHAiOjE3MTAzOTM0NDZ9.YWVqIJYKigR5VQG19PyUw6OyZBzSjpZQb5_WCEP76HM"
}
```

### Body

```json
{
  "Name": "mfmdslkfnhj",
  "Image": "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/main-image/2020/05/08/2096631-814127042.jpg?itok=RZmIbcc9",
  "PreRelease": true,
  "Price": 4561.5,
  "Description": "elsisi r2esy",
  "Quantity": 1,
  "Category": "Health"
}
```

### Response Example:

```json
{
  "status": "success",
  "product": [
    {
      "id": 5,
      "image": "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/main-image/2020/05/08/2096631-814127042.jpg?itok=RZmIbcc9",
      "name": "mfmdslkbbfnhj",
      "prerelease": true,
      "price": 4561.5,
      "description": "elsisi r2esy",
      "quantity": 1,
      "sellerid": 3,
      "putdate": "2023-12-15T05:28:17.000Z",
      "category": "Health",
      "storedin": 1
    }
  ]
}
```

### OR

```json
{
  "status": "fail",
  "message": "Need Seller to Create Product"
}
```

## Add Product To WishList

### Api Route

`Endpoint : 'Post /api/v1/product/id'`
`Authorization: Bearer JWT (for a Customer)  As a Header in Req`

### Request Example:

`Endpoint Ex: 'Post /api/v1/product/3'`

### Headers

```json
headers
{
	Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNjE3NDQ2LCJleHAiOjE3MTAzOTM0NDZ9.YWVqIJYKigR5VQG19PyUw6OyZBzSjpZQb5_WCEP76HM"
}
```

### Body

```json
{}
```

### Response Example:

```json
{
  "status": "success"
}
```

### OR

```json
{
  "status": "fail",
  "message": "You Already Have Done This Before"
}
```

## Add Review To Product

### Api Route

`Endpoint : 'Post /api/v1/review/id'`
`Authorization: Bearer JWT (for a Customer)  As a Header in Req`

### Request Example:

`Endpoint Ex: 'Post /api/v1/review/3'`

### Headers

```json
headers
{
	Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNjE3NDQ2LCJleHAiOjE3MTAzOTM0NDZ9.YWVqIJYKigR5VQG19PyUw6OyZBzSjpZQb5_WCEP76HM"
}
```

### Body

```json
{
  "rating": 4.3,
  "comment": "very good from api"
}
```

### Response Example:

```json
{
  "status": "success"
}
```

### OR

```json
{
  "status": "fail",
  "message": "You Already Have Done This Before"
}
```

### OR

```json
{
  "status": "fail",
  "message": "rating must be between 0 and 5"
}
```

### OR

````json
{
    "status": "fail",
    "message": "This Action Need Customer Auth"
}```


## Delete Review By Id
### Api Route
`
Endpoint : 'Delete /api/v1/review/id'
`
`
Authorization: Bearer JWT (for the owner of the review)  As a Header in Req
`
### Request Example:
``
Endpoint Ex: 'Delete /api/v1/review/3'
``
### Headers
```json
headers
{
	Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNjE3NDQ2LCJleHAiOjE3MTAzOTM0NDZ9.YWVqIJYKigR5VQG19PyUw6OyZBzSjpZQb5_WCEP76HM"
}
````

### Body

```json
{}
```

### Response Example:

```json
{
  "status": "success"
}
```

### OR

```json
{
  "status": "fail",
  "message": "You Already Have Done This Before"
}
```

### OR

```json
{
  "status": "fail",
  "message": "No Review With This Id Found"
}
```

### OR

```json
{
  "status": "fail",
  "message": "only review owner can delete it"
}
```

## Buy Products

### Api Route

`Endpoint : 'Post /api/v1/buy'`
`Authorization: Bearer JWT (for a customer)  As a Header in Req`

### Request Example:

`Endpoint Ex: 'Post /api/v1/buy'`

### Headers

```json
headers
{
	Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNjE3NDQ2LCJleHAiOjE3MTAzOTM0NDZ9.YWVqIJYKigR5VQG19PyUw6OyZBzSjpZQb5_WCEP76HM"
}
```

### Body

```json
{
  "cart": [
    {
      "productId": 15,
      "Quantity": 3,
      "shippedvia": 1
    },
    {
      "productId": 13,
      "Quantity": 1,
      "shippedvia": 1
    }
  ]
}
```

### Response Example:

```json
{
  "status": "success"
}
```

### OR

```json
{
  "status": "fail",
  "message": "not enough money in your balance"
}
```

### OR

```json
{
  "status": "fail",
  "message": "bad request"
}
```

### OR

```json
{
  "status": "fail",
  "message": "No Product With This Id Found"
}
```

## Recharge Balance

### Api Route

`Endpoint : 'Post /api/v1/user/Customer/recharge'`
`Authorization: Bearer JWT (for a customer)  As a Header in Req`

### Request Example:

`Endpoint Ex: 'Post /api/v1/user/Customer/recharge'`

### Headers

```json
headers
{
	Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNjE3NDQ2LCJleHAiOjE3MTAzOTM0NDZ9.YWVqIJYKigR5VQG19PyUw6OyZBzSjpZQb5_WCEP76HM"
}
```

### Body

```json
{
  "money": 5
}
```

### Response Example:

```json
{
  "status": "success"
}
```

### OR

```json
{
  "status": "fail",
  "message": "Money is required"
}
```

### OR

```json
{
  "status": "fail",
  "message": "Money money must be positive"
}
```

## upgrade to permium

### Api Route

`Endpoint : 'Post /api/v1/user/Customer/upgrade'`
`Authorization: Bearer JWT (for a customer and normal not permium)  As a Header in Req`

### Request Example:

`Endpoint Ex: 'Post /api/v1/user/Customer/upgrade'`

### Headers

```json
headers
{
	Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNjE3NDQ2LCJleHAiOjE3MTAzOTM0NDZ9.YWVqIJYKigR5VQG19PyUw6OyZBzSjpZQb5_WCEP76HM"
}
```

### Body

```json
{}
```

### Response Example:

```json
{
  "status": "success"
}
```

### OR

```json
{
  "status": "fail",
  "message": "You Already Have Done This Before"
}
```

### OR

```json
{
  "status": "fail",
  "message": "not enough money in your balance"
}
```

## get all reviews of product

### Api Route

`Endpoint : 'GET /api/v1/review/productid'`
`Authorization: no need`

### Request Example:

`Endpoint Ex: 'Post /api/v1/review/5'`

### Headers

```json
headers
{
}
```

### Body

```json
{}
```

### Response Example:

```json
{
  "status": "success",
  "reviews": [
    {
      "reviewid": 45,
      "customerid": 12,
      "productid": 5,
      "date": "2023-12-23T14:23:10.000Z",
      "rating": 4,
      "comment": "very good good from api",
      "upvotes": 0
    },
    {
      "reviewid": 49,
      "customerid": 22,
      "productid": 5,
      "date": "2023-12-23T14:26:50.000Z",
      "rating": 4,
      "comment": "very good good from api",
      "upvotes": 0
    }
  ]
}
```

### OR

```json
{
  "status": "fail",
  "message": "No Product With This Id Found"
}
```

## Get Product By name

### Api Route

`Endpoint : 'POST /api/v1/product/searchProduct'
Authorization: No Auth Needed`
`Authorization: No Auth Needed`

### Request Example:

`Endpoint Ex: 'POST /api/v1/product/searchProduct'`

```json
No Body Needed
```

### Response Example:

```json
{
  "status": "success",
  "products": [
    {
      "id": 5,
      "image": "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/main-image/2020/05/08/2096631-814127042.jpg?itok=RZmIbcc9",
      "name": "mfmdslkbbfnhj",
      "prerelease": true,
      "price": 4561.5,
      "description": "elsisi r2esy",
      "quantity": 1,
      "sellerid": 3,
      "putdate": "2023-12-15T05:28:17.000Z",
      "category": "Health",
      "storedin": 1,
      "sellerFName": "new",
      "sellerLName": "newF"
    },
    {
      "id": 10,
      "image": "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/main-image/2020/05/08/2096631-814127042.jpg?itok=RZmIbcc9",
      "name": "mfmdfnhj",
      "prerelease": true,
      "price": 4561.5,
      "description": "elsisi r2esy",
      "quantity": 1,
      "sellerid": 5,
      "putdate": "2023-12-15T05:50:53.000Z",
      "category": "Health",
      "storedin": 1
    },
    {
      "id": 3,
      "image": "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/main-image/2020/05/08/2096631-814127042.jpg?itok=RZmIbcc9",
      "name": "mfmdslkfnhj",
      "prerelease": true,
      "price": 4561.5,
      "description": "elsisi r2esy",
      "quantity": 2,
      "sellerid": 3,
      "putdate": "2023-12-13T09:01:13.000Z",
      "category": "Health",
      "storedin": 1
    }
  ]
}
```

### OR

```json
{
  "status": "fail",
  "message": "no product found by this name"
}
```

## update user info

### Api Route

`Endpoint : 'POST /api/v1/user/updateInfo'`
`Authorization: Bearer JWT As a Header in Req`

### Request Example:

`Endpoint Ex: 'POST /api/v1/user/updateInfo'`

```json
headers
{
	Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNjE3NDQ2LCJleHAiOjE3MTAzOTM0NDZ9.YWVqIJYKigR5VQG19PyUw6OyZBzSjpZQb5_WCEP76HM"
}
```

```json
{
  "FName": "customizedesllllam",
  "LName": "newF",
  "PhoneNumber": "01204747568",
  "Password": "Password123456",
  "Gender": "Male",
  "ApartmentNumber": -1,
  "BuildingNumber": 1,
  "Country": "om eldonia",
  "City": "cairo",
  "Street": "shoubra",
  "role": "Customer",
  "NId": "189465"
}
```

### Response Example:

```json
{
  "status": "success",
  "info": [
    {
      "id": 5,
      "firstname": "customizedesllllam",
      "lastname": "newF",
      "phonenumber": "01204747568",
      "image": "default address",
      "balance": 0,
      "email": "eslam@ggfdv.com",
      "password": "$2b$12$fnaVG84UitLyzQyNH8/ZmOZeT5AscPRWJohOCkHjy4/6nqgemHe76",
      "theme": "Light",
      "banned": false,
      "gender": "Male",
      "appartmentnumber": -1,
      "buildingnumber": 1,
      "country": "om eldonia",
      "city": "cairo",
      "street": "shoubra",
      "passwordchangedat": "2023-12-23T18:29:03.000Z",
      "passwordresettoken": "3165494",
      "passwordresetexpires": "2023-12-23T18:29:03.000Z"
    }
  ]
}
```

### OR

```json
{
  "status": "fail",
  "message": "something went wrong"
}
```
