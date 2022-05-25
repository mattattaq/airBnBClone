CREATE TABLE Listings (
    Id int AUTO_INCREMENT,
    ListingName varchar(255) NOT NULL,
    PRIMARY KEY (`Id`)
);
INSERT INTO Listings(ListingName) VALUES("room1");
INSERT INTO Listings(ListingName) VALUES("room2");

CREATE TABLE Reserved (
    Id INT AUTO_INCREMENT,
    startDate date,
    endDate date,
    PRIMARY KEY(`Id`),
    listing_id INT NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES Listings(`Id`)
);