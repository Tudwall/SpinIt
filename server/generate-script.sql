DROP DATABASE IF EXISTS spinit;
CREATE DATABASE spinit;
USE spinit;

CREATE TABLE Users (
id int PRIMARY KEY,
pfp varchar(100),
name varchar(100),
bio varchar(350),
email varchar(350) UNIQUE,
pwd varchar(100)
);

CREATE TABLE Releases (
id int PRIMARY KEY,
cover varchar(100),
title varchar(100),
artists varchar (200),
release_date date,
discogs_id int UNIQUE
);

CREATE TABLE Collection_Details (
id int PRIMARY KEY,
release_id int,
CONSTRAINT fk_col_release_id FOREIGN KEY (release_id) REFERENCES Releases(id)
);

CREATE TABLE User_Collection (
id int PRIMARY KEY,
user_id int,
collection_id int,
CONSTRAINT fk_user_col_id FOREIGN KEY (user_id) REFERENCES Users(id),
CONSTRAINT fk_collection_id FOREIGN KEY (collection_id) REFERENCES Collection_Details(id)
);

CREATE TABLE Wishlist_Details (
id int PRIMARY KEY,
release_id int,
CONSTRAINT fk_wish_release_id FOREIGN KEY (release_id) REFERENCES Releases(id)
);

CREATE TABLE User_Wishlist (
id int PRIMARY KEY,
user_id int,
wishlist_id int,
CONSTRAINT fk_user_wish_id FOREIGN KEY (user_id) REFERENCES Users(id),
CONSTRAINT fk_wishlist_id FOREIGN KEY (wishlist_id) REFERENCES Wishlist_Details(id)
);

CREATE TABLE Review_Details (
id int PRIMARY KEY,
release_id int, 
note int CHECK (note >=0),
CONSTRAINT fk_rev_release_id FOREIGN KEY (release_id) REFERENCES Releases(id)
);

CREATE TABLE User_Reviews (
id int PRIMARY KEY,
user_id int,
review_id int,
CONSTRAINT fk_user_rev_id FOREIGN KEY (user_id) REFERENCES Users(id),
CONSTRAINT fk_review_id FOREIGN KEY (review_id) REFERENCES Review_Details(id)
);