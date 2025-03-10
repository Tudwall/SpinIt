DROP DATABASE IF EXISTS spinit;

CREATE DATABASE spinit;

USE spinit;

CREATE TABLE
    users (
        id UUID PRIMARY KEY DEFAULT UUID (),
        pfp VARCHAR(100),
        name VARCHAR(100),
        bio VARCHAR(350),
        email VARCHAR(350) UNIQUE,
        pwd VARCHAR(100),
        admin BOOLEAN NOT NULL DEFAULT FALSE,
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedOn TIMESTAMP,
        isDeleted BOOLEAN NOT NULL DEFAULT FALSE
    );

CREATE TABLE
    releases (
        id UUID PRIMARY KEY DEFAULT UUID (),
        cover VARCHAR(100),
        title VARCHAR(100),
        artists VARCHAR(200),
        release_date DATE,
        discogs_id INT UNIQUE,
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedOn TIMESTAMP,
        isDeleted BOOLEAN NOT NULL DEFAULT FALSE
    );

CREATE TABLE
    tags (
        id UUID PRIMARY KEY,
        release_id UUID,
        tag VARCHAR(200),
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedOn TIMESTAMP,
        isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        CONSTRAINT fk_tag_release_id FOREIGN KEY (release_id) REFERENCES releases (id)
    );

CREATE TABLE
    user_tags (
        id UUID PRIMARY KEY DEFAULT UUID (),
        tag_id UUID,
        user_id UUID,
        COUNT BIGINT,
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedOn TIMESTAMP,
        isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        CONSTRAINT fk_tag_id FOREIGN KEY (tag_id) REFERENCES tags (id),
        CONSTRAINT fk_user_tag_id FOREIGN KEY (user_id) REFERENCES users (id)
    );

CREATE TABLE
    collection_details (
        id UUID PRIMARY KEY DEFAULT UUID (),
        release_id UUID,
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedOn TIMESTAMP,
        isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        CONSTRAINT fk_col_release_id FOREIGN KEY (release_id) REFERENCES releases (id)
    );

CREATE TABLE
    user_collection (
        id UUID PRIMARY KEY DEFAULT UUID (),
        user_id UUID,
        collection_id UUID,
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedOn TIMESTAMP,
        isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        CONSTRAINT fk_user_col_id FOREIGN KEY (user_id) REFERENCES users (id),
        CONSTRAINT fk_collection_id FOREIGN KEY (collection_id) REFERENCES collection_details (id)
    );

CREATE TABLE
    wishlist_details (
        id UUID PRIMARY KEY DEFAULT UUID (),
        release_id UUID,
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedOn TIMESTAMP,
        isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        CONSTRAINT fk_wish_release_id FOREIGN KEY (release_id) REFERENCES releases (id)
    );

CREATE TABLE
    user_wishlist (
        id UUID PRIMARY KEY DEFAULT UUID (),
        user_id UUID,
        wishlist_id UUID,
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedOn TIMESTAMP,
        isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        CONSTRAINT fk_user_wish_id FOREIGN KEY (user_id) REFERENCES users (id),
        CONSTRAINT fk_wishlist_id FOREIGN KEY (wishlist_id) REFERENCES wishlist_details (id)
    );

CREATE TABLE
    review_details (
        id UUID PRIMARY KEY DEFAULT UUID (),
        release_id UUID,
        note INT CHECK (note >= 0),
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedOn TIMESTAMP,
        isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        CONSTRAINT fk_rev_release_id FOREIGN KEY (release_id) REFERENCES releases (id)
    );

CREATE TABLE
    user_reviews (
        id UUID PRIMARY KEY DEFAULT UUID (),
        user_id UUID,
        review_id UUID,
        createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedOn TIMESTAMP,
        isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
        CONSTRAINT fk_user_rev_id FOREIGN KEY (user_id) REFERENCES users (id),
        CONSTRAINT fk_review_id FOREIGN KEY (review_id) REFERENCES review_details (id)
    );