USE spinit;

INSERT INTO
    Users (pfp, name, bio, email, pwd)
VALUES
    (
        "#",
        "John2",
        "bio",
        "john2@john.fr",
        '$argon2d$v=19$m=16,t=2,p=1$WEdhY1NDMDM1VGNSaWJ6dA$ZNyBGlsm862IHmB+18qbwA'
    );

INSERT INTO
    Releases (cover, title, artists, release_date, discogs_id) VALUE (
        "#",
        "Funeralopolis",
        "Electric Wizard",
        "2011-01-01",
        123456
    );