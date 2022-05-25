CREATE TABLE Listings (
    Id int AUTO_INCREMENT,
    ListingName varchar(255) NOT NULL,
    PRIMARY KEY (`Id`)
);
INSERT INTO Listings(ListingName) VALUES("a");

-- const reservationQuery = `INSERT INTO Reserved (startDate, endDate) VALUES( '${req.body.startDate}', '${req.body.endDate}')`;
CREATE TABLE Reserved (
    Id INT AUTO_INCREMENT,
    startDate date,
    endDate date,
    PRIMARY KEY(`Id`),
    listing_id INT NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES Listings(`Id`)
);
    
    -- RoomType varchar(255) NOT NULL,
    -- Address varchar(255) NOT NULL,
CREATE TABLE Customer (
    Id int AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    email varchar(255),
    phoneNumber varchar(255),
    PRIMARY KEY(`Id`)
)

-- customerId INT NOT NULL,
-- listing_id INT NOT NULL,
-- FOREIGN KEY (listing_id) REFERENCES Listings(`Id`),
-- FOREIGN KEY (customerId) REFERENCES Customer(`Id`),