CREATE TABLE
    IF NOT EXISTS `users` (
        `id` varchar(36) NOT NULL,
        `name` varchar(100) NOT NULL,
        `email` varchar(50) NOT NULL,
        `hashed_password` varchar(60) NOT NULL,
        `admin` boolean NOT NULL DEFAULT 0,
        `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
    users (id, name, email, hashed_password, admin)
VALUES
    (
        '7c2d548b-c2f9-48fe-842c-c03a70c8f3fc',
        'John Smith',
        'Smith@example.com',
        '$2a$12$nklH38sEOS2SRUYDWGVsl.SlaelTEy/l2aznsXsMdY5SmpGM.zDaS',
        '1'
    );

CREATE TABLE
    IF NOT EXISTS `listings` (
        `id` int (11) NOT NULL AUTO_INCREMENT,
        `title` varchar(50) NOT NULL,
        `description` varchar(100) NOT NULL,
        `price` decimal(10, 2) NOT NULL,
        `owner` varchar(36) NOT NULL,
        `image` varchar(255),
        `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
    listings (title, description, price, image, owner)
VALUES
    (
        'Bike',
        'A nice bike',
        '100.00',
        'https://www.prioritybicycles.com/cdn/shop/products/600x_angldfront.jpg?v=1708061432&width=1500',
        '7c2d548b-c2f9-48fe-842c-c03a70c8f3fc'
    );