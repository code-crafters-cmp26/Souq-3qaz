CREATE TABLE product(
Id serial NOT NULL,
Image VARCHAR(300) NOT NULL,
Name VARCHAR(200) NOT NULL,
PreRelease Bool NOT NULL,
Price float NOT NULL,
Description TEXT NOT NULL,
Quantity smallint NOT NULL,
SellerId integer NOT NULL,
PutDate timestamp NOT NULL,
Category ProductCategory NOT NULL,
StoredIn INTEGER NOT NULL,
CONSTRAINT pk_product PRIMARY KEY(ID));
ALTER TABLE product ADD CONSTRAINT fk_StoredIn_WareHouse FOREIGN KEY (StoredIn) REFERENCES WareHouse(Id) ON DELETE CASCADE;
ALTER TABLE product ADD CONSTRAINT fk_SellerId_Seller FOREIGN KEY (SellerId) REFERENCES Seller(Id) ON DELETE CASCADE;


CREATE Table WareHouse (
Id serial NOT NULL,
MaxQuantity smallint NOT NULL,
BuildingNumber smallint NOT NULL,
Country VARCHAR(30) NOT NULL,
City VARCHAR(30) NOT NULL,
Street VARCHAR(50) NOT NULL,
CONSTRAINT pk_WareHouse PRIMARY KEY(ID)
);

CREATE TYPE Theme_type AS ENUM('Dark','Light');
CREATE TYPE Gender_type AS ENUM('Male','Female');

CREATE Table "User" (
Id serial NOT NULL,
FirstName VARCHAR(20) NOT NULL,
LastName VARCHAR(20) NOT NULL,
PhoneNumber VARCHAR(20) NOT NULL,
Image VARCHAR(300),
Balance float(2) NOT NULL,
Email VARCHAR(100) NOT NULL,
Password VARCHAR(60) NOT NULL,
Theme Theme_type Not NULL DEFAULT 'Light',
Banned Bool Not NULL DEFAULT false,
Gender Gender_type Not NULL,
AppartmentNumber smallint,
BuildingNumber smallint Not NULL,
Country VARCHAR(30) Not NULL,
City VARCHAR(30) Not NULL,
Street VARCHAR(50) Not NULL,
CONSTRAINT pk_User PRIMARY KEY(ID)
);

ALTER TABLE "User" ADD COLUMN passwordChangedAt timestamp;
ALTER TABLE "User" ADD COLUMN passwordResetToken VARCHAR(150);
ALTER TABLE "User" ADD COLUMN passwordResetExpires timestamp;



CREATE TYPE Customer_type AS ENUM('Normal','Premium');
CREATE Table Customer (
Id SERIAL NOT NULL,
Type Customer_type NOT NULL DEFAULT 'Normal',
CONSTRAINT pk_Customer PRIMARY KEY(ID),
CONSTRAINT fk_Customer_user FOREIGN KEY (Id) REFERENCES "User"(Id)
);
ALTER TABLE Customer ADD CONSTRAINT fk_Customer_user FOREIGN KEY (Id) REFERENCES "User"(Id) ON DELETE CASCADE;

CREATE Table Seller (
Id SERIAL NOT NULL,
NID VARCHAR(20) NOT NULL,
CONSTRAINT pk_Seller PRIMARY KEY(ID)
);
ALTER TABLE Seller ADD CONSTRAINT fk_Seller_user FOREIGN KEY (Id) REFERENCES "User"(Id) ON DELETE CASCADE;


CREATE TYPE Employee_type AS ENUM('Tech Support','Admin');
CREATE Table Employee(
  Id SERIAL NOT NULL,
  start_working_date Date NOT NULL,
  Position Employee_type NOT NULL,
  CONSTRAINT pk_Employee PRIMARY KEY(ID)
);
ALTER TABLE Employee ADD CONSTRAINT fk_Employee_user FOREIGN KEY (Id) REFERENCES "User"(Id) ON DELETE CASCADE;


CREATE Table ShippingCompany (
  Id SERIAL NOT NULL,
  Email VARCHAR(100) NOT NULL,
  Name VARCHAR(200)  NOT NULL,
  PricePerKM float(4) NOT NULL,
  BuildingNumber smallint NOT NULL,
  Country VARCHAR(30) NOT NULL,
  City VARCHAR(30) NOT NULL,
  Street VARCHAR(50) NOT NULL,
  CONSTRAINT pk_ShippingCompany PRIMARY KEY(ID)
);


CREATE Table MessagesArchive (
  MessageId SERIAL NOT NULL,
  SenderId INTEGER NOT NULL,
  ReceiverId INTEGER NOT NULL,
  Date timestamp NOT NULL,
  Messagetext TEXT NOT NULL,
  CONSTRAINT pk_MessagesArchive PRIMARY KEY(MessageId)
);
ALTER TABLE MessagesArchive ADD CONSTRAINT fk_SenderId_user FOREIGN KEY (SenderId) REFERENCES "User"(Id) ON DELETE CASCADE;
ALTER TABLE MessagesArchive ADD CONSTRAINT fk_ReceiverId_user FOREIGN KEY (ReceiverId) REFERENCES "User"(Id) ON DELETE CASCADE;


CREATE TYPE Report_type AS ENUM('sexual harassment','scammer');
CREATE Table Report (
  ReportId SERIAL NOT NULL,
  SellerId INTEGER NOT NULL,
  CustomerId INTEGER NOT NULL,
  Category Report_type NOT NULL,
  Date timestamp NOT NULL,
  Description TEXT NOT NULL,
  CONSTRAINT pk_Report PRIMARY KEY(ReportId)
);
ALTER TABLE Report ADD CONSTRAINT fk_SellerId_Seller FOREIGN KEY (SellerId) REFERENCES Seller(Id) ON DELETE CASCADE;
ALTER TABLE Report ADD CONSTRAINT fk_CustomerId_Customer FOREIGN KEY (CustomerId) REFERENCES Customer(Id) ON DELETE CASCADE;

CREATE Table Transaction (
  TransactionId SERIAL NOT NULL,
  CustomerId INTEGER NOT NULL,
  ProductId INTEGER NOT NULL,
  Date timestamp NOT NULL,
  FromAuction Bool NOT NULL DEFAULT false,
  Returned Bool NOT NULL DEFAULT false,
  ShippedVia INTEGER NOT NULL,
  Quantity smallint NOT NULL,
  CONSTRAINT pk_Transaction PRIMARY KEY(TransactionId)
);
ALTER TABLE Transaction ADD CONSTRAINT fk_ProductId_Product FOREIGN KEY (ProductId) REFERENCES Product(Id) ON DELETE CASCADE;
ALTER TABLE Transaction ADD CONSTRAINT fk_CustomerId_Customer FOREIGN KEY (CustomerId) REFERENCES Customer(Id) ON DELETE CASCADE;
ALTER TABLE Transaction ADD CONSTRAINT fk_ShippedVia_ShippingCompany FOREIGN KEY (ShippedVia) REFERENCES ShippingCompany(Id) ON DELETE CASCADE;


CREATE Table Review (
  ReviewId SERIAL NOT NULL,
  CustomerId INTEGER NOT NULL,
  ProductId INTEGER NOT NULL,
  Date timestamp NOT NULL,
  Rating float(2) CHECK (Rating >= 1 AND Rating <= 5),
  Comment VARCHAR(250),
  Upvotes smallint NOT NULL DEFAULT 0,
  CONSTRAINT pk_Review PRIMARY KEY(ReviewId)
);
ALTER TABLE Review ADD CONSTRAINT fk_ProductId_Product FOREIGN KEY (ProductId) REFERENCES Product(Id) ON DELETE CASCADE;
ALTER TABLE Review ADD CONSTRAINT fk_CustomerId_Customer FOREIGN KEY (CustomerId) REFERENCES Customer(Id) ON DELETE CASCADE;


CREATE Table WishList (
  CustomerId INTEGER NOT NULL,
  ProductId INTEGER NOT NULL,
  Date timestamp NOT NULL,
  CONSTRAINT pk_WishList PRIMARY KEY(CustomerId,ProductId)
);
ALTER TABLE WishList ADD CONSTRAINT fk_ProductId_Product FOREIGN KEY (ProductId) REFERENCES Product(Id) ON DELETE CASCADE;
ALTER TABLE WishList ADD CONSTRAINT fk_CustomerId_Customer FOREIGN KEY (CustomerId) REFERENCES Customer(Id) ON DELETE CASCADE;

CREATE Table Bid (
  AcutionId INTEGER NOT NULL,
  CustomerId INTEGER NOT NULL,
  Date timestamp NOT NULL,
  price float(2)  NOT NULL,
  CONSTRAINT pk_Bid PRIMARY KEY(AcutionId,CustomerId,Date)
);
ALTER TABLE Bid ADD CONSTRAINT fk_AcutionId_Auction FOREIGN KEY (AcutionId) REFERENCES Auction(AcutionId) ON DELETE CASCADE;
ALTER TABLE Bid ADD CONSTRAINT fk_CustomerId_Customer FOREIGN KEY (CustomerId) REFERENCES Customer(Id) ON DELETE CASCADE;

CREATE Table Auction (
  AcutionId SERIAL NOT NULL,
  SellerId INTEGER NOT NULL,
  ProductId INTEGER NOT NULL,
  Date timestamp NOT NULL,
  IntialPrice float(2) NOT NULL,
  Quantity smallint NOT NULL,
  CONSTRAINT pk_Auction PRIMARY KEY(AcutionId)
);
ALTER TABLE Auction ADD CONSTRAINT fk_ProductId_Product FOREIGN KEY (ProductId) REFERENCES Product(Id) ON DELETE CASCADE;
ALTER TABLE Auction ADD CONSTRAINT fk_SellerId_Seller FOREIGN KEY (SellerId) REFERENCES Seller(Id) ON DELETE CASCADE;


CREATE Table Barter (
  BarterId SERIAL NOT NULL,
  RequestingSellerId INTEGER NOT NULL,
  RequestedSellerId INTEGER NOT NULL,
  OfferedProductId INTEGER NOT NULL,
  RequistedProductId INTEGER NOT NULL,
  Date timestamp  NOT NULL,
  OfferedProductIdQuantity smallint NOT NULL,
  RequistedProductIdQuantity smallint NOT NULL,
  CONSTRAINT pk_Barter PRIMARY KEY(BarterId)
);
ALTER TABLE Barter ADD CONSTRAINT fk_RequestingSellerId_Seller FOREIGN KEY (RequestingSellerId) REFERENCES Seller(Id) ON DELETE CASCADE;
ALTER TABLE Barter ADD CONSTRAINT fk_RequestedSellerId_Seller FOREIGN KEY (RequestedSellerId) REFERENCES Seller(Id) ON DELETE CASCADE;
ALTER TABLE Barter ADD CONSTRAINT fk_OfferedProductId_Seller FOREIGN KEY (OfferedProductId) REFERENCES Product(Id) ON DELETE CASCADE;
ALTER TABLE Barter ADD CONSTRAINT fk_RequistedProductId_Seller FOREIGN KEY (RequistedProductId) REFERENCES Product(Id) ON DELETE CASCADE;