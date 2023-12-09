# SOUQ 3QAZ (API DOC)

## All Apis starts with http://127.0.0.1:3000
# =====================================

## Get All Products
### Api Route 
`
Endpoint : 'GET /api/v1/product'
`
`
Authorization: No Auth Needed
`
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
            "id": 7,
            "image": "https://firebasestorage.googleapis.com/v0/b/testing-a311d.appspot.com/o/ff7smemnwvy51-removebg-preview%20(1).png?alt=media&token=46f9df3c-6efd-46dc-9317-6ccabb29d425",
            "name": "iphone",
            "prerelease": false,
            "price": 1500,
            "description": "this is nice phone",
            "quantity": 3,
            "sellerid": 63,
            "putdate": "2023-12-07T20:05:35.000Z",
            "category": "Electronic",
            "storedin": 1
        }
    ]
}
```


## Get Product By Id
### Api Route 
`
Endpoint : 'GET /api/v1/product/{id}'
Authorization: No Auth Needed
`
`
Authorization: No Auth Needed
`
### Request Example:
``
Endpoint Ex: 'GET /api/v1/product/7'
``
```json
No Body Needed
```
### Response Example:
```json
{
    "status": "success",
    "products": [
        {
            "id": 7,
            "image": "https://firebasestorage.googleapis.com/v0/b/testing-a311d.appspot.com/o/ff7smemnwvy51-removebg-preview%20(1).png?alt=media&token=46f9df3c-6efd-46dc-9317-6ccabb29d425",
            "name": "iphone",
            "prerelease": false,
            "price": 1500,
            "description": "this is nice phone",
            "quantity": 3,
            "sellerid": 63,
            "putdate": "2023-12-07T20:05:35.000Z",
            "category": "Electronic",
            "storedin": 1
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
`
Endpoint : 'Post /api/v1/user/signup'
`
`
Authorization: No auth needed
`
### Request Example:
``
Endpoint Ex: 'Post /api/v1/user/signup'
``
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
        "BuildingNumber":1,
        "Country":"om eldonia",
        "City":"cairo",
        "Street":"shoubra",
        "role":"Customer",   //enum of {'Seller','Customer'}
        "NId":"189465"   // is required only in case of Customer
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
    "message": "this eamil is already exists"
}
{
    "status": "fail",
    "message": "Phone number must only contain numerical digits"
}
```

## LogIn User
### Api Route 
`
Endpoint : 'Post /api/v1/user/login'
`
`
Authorization: No auth needed
`
### Request Example:
``
Endpoint Ex: 'Post /api/v1/user/login'
``
### Headers
```json
headers
{
}
```
### Body
```json
{
    "email":"bishoy@gmail.com",
    "password":"Password123456"
}
```
### Response Example:
```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODcsImlhdCI6MTcwMjA4NDgzNiwiZXhwIjoxNzA5ODYwODM2fQ.5AYXchGt1dIYMmplY_fX3jyuYlHMGcieJaFWB-twKG4",
    "user": {
        "password": "$2b$12$TBqyHKlY.0nNvVRV7G2d5eYUJNhkrSI513zUX//kFg.7LQcRlXQqW"
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
