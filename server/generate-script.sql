DROP DATABASE IF EXISTS spinit;
CREATE DATABASE spinit;
USE spinit;

CREATE TABLE users (
id int PRIMARY KEY,
pfp varchar(100),
name varchar(100),
bio varchar(350),
email varchar(350) UNIQUE,
pwd varchar(100)
);

CREATE TABLE releases (
id int PRIMARY KEY,
cover varchar(100),
title varchar(100),
artists varchar (200),
release_date date,
discogs_id int UNIQUE
);

CREATE TABLE tags (
    id int PRIMARY KEY,
    release_id int,
    tag varchar(200),
    CONSTRAINT fk_tag_release_id FOREIGN KEY (release_id) REFERENCES releases(id)
);

CREATE TABLE user_tags (
    id int PRIMARY KEY,
    tag_id int,
    user_id int,
    count bigint,
    CONSTRAINT fk_tag_id FOREIGN KEY (tag_id) REFERENCES tags(id),
    CONSTRAINT fk_user_tag_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE collection_details (
id int PRIMARY KEY,
release_id int,
CONSTRAINT fk_col_release_id FOREIGN KEY (release_id) REFERENCES releases(id)
);

CREATE TABLE user_collection (
id int PRIMARY KEY,
user_id int,
collection_id int,
CONSTRAINT fk_user_col_id FOREIGN KEY (user_id) REFERENCES users(id),
CONSTRAINT fk_collection_id FOREIGN KEY (collection_id) REFERENCES collection_details(id)
);

CREATE TABLE wishlist_details (
id int PRIMARY KEY,
release_id int,
CONSTRAINT fk_wish_release_id FOREIGN KEY (release_id) REFERENCES releases(id)
);

CREATE TABLE user_wishlist (
id int PRIMARY KEY,
user_id int,
wishlist_id int,
CONSTRAINT fk_user_wish_id FOREIGN KEY (user_id) REFERENCES users(id),
CONSTRAINT fk_wishlist_id FOREIGN KEY (wishlist_id) REFERENCES wishlist_details(id)
);

CREATE TABLE review_details (
id int PRIMARY KEY,
release_id int, 
note int CHECK (note >=0),
CONSTRAINT fk_rev_release_id FOREIGN KEY (release_id) REFERENCES releases(id)
);

CREATE TABLE user_reviews (
id int PRIMARY KEY,
user_id int,
review_id int,
CONSTRAINT fk_user_rev_id FOREIGN KEY (user_id) REFERENCES users(id),
CONSTRAINT fk_review_id FOREIGN KEY (review_id) REFERENCES review_details(id)
);