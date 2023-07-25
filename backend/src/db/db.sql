DROP DATABASE IF EXISTS Trainstagram;
CREATE DATABASE Trainstagram;
USE Trainstagram;

CREATE TABLE Posts (
    PostID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    PostImage BLOB,
    Caption VARCHAR(100),
    Likes INT,
    PostedAt DATETIME
);

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(100),
    CreatedAt DATETIME,
    Biography VARCHAR(50),
    ProfilePicture BLOB
);

INSERT INTO users (Username, CreatedAt, Biography, ProfilePicture) VALUES ('Dave',null,'Davedsad',null);




