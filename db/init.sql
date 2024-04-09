CREATE TABLE
    IF NOT EXISTS `users` (
        `id` varchar(36) NOT NULL,
        `username` varchar(50) NOT NULL,
        `email` varchar(50) NOT NULL,
        `hashed_password` varchar(60) NOT NULL,
        `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE
    IF NOT EXISTS `products` (
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

CREATE TABLE
    IF NOT EXISTS `favorites` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `user_id` VARCHAR(36) CHARACTER
        SET
            latin1 COLLATE latin1_swedish_ci NOT NULL,
            `product_id` INT (11) NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
            FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
    );

INSERT INTO `users` (`id`, `username`, `email`, `hashed_password`)
VALUES
    (
        '7c2d548b-c2f9-48fe-842c-c03a70c8f3fc',
        'JohnSmith',
        'Smith@example.com',
        '$2a$12$nklH38sEOS2SRUYDWGVsl.SlaelTEy/l2aznsXsMdY5SmpGM.zDaS'
    );

INSERT INTO
    `products` (`title`, `description`, `price`, `image`, `owner`)
VALUES
    (
        'Bike',
        'A nice bike',
        '100.00',
        'https://via.placeholder.com/250',
        '7c2d548b-c2f9-48fe-842c-c03a70c8f3fc'
    ),
    (
        'Laptop',
        'A powerful laptop',
        '800.00',
        'https://via.placeholder.com/250',
        'd279c990-74cc-45fd-8f8b-212d3f588ddb'
    ),
    (
        'Smartphone',
        'A sleek smartphone',
        '500.00',
        'https://via.placeholder.com/250',
        'e2e8e9c7-f7de-4e11-b8ef-1f56e6e5a7a7'
    ),
    (
        'Camera',
        'A professional camera',
        '1200.00',
        'https://via.placeholder.com/250',
        'a42b4d2d-1b22-4b5b-8eb9-d69be0aae3f2'
    ),
    (
        'Headphones',
        'High-quality headphones',
        '150.00',
        'https://via.placeholder.com/250',
        '9c15ff14-8904-4c2a-8474-d87b6b3f6d85'
    ),
    (
        'Watch',
        'A stylish watch',
        '300.00',
        'https://via.placeholder.com/250',
        'dbf8ac0b-56dc-4736-9239-ee87d3b5189e'
    ),
    (
        'Sunglasses',
        'Designer sunglasses',
        '200.00',
        'https://via.placeholder.com/250',
        '6e9bf0df-c056-4db9-90a1-39d3e5cc4e62'
    ),
    (
        'Backpack',
        'A durable backpack',
        '80.00',
        'https://via.placeholder.com/250',
        'f4e1f6ad-5bb7-41df-8b1c-9e61c477fc8a'
    ),
    (
        'Gaming Console',
        'The latest gaming console',
        '400.00',
        'https://via.placeholder.com/250',
        '56eb2004-d405-47c7-93ad-869f1cb1fd7e'
    ),
    (
        'Speaker',
        'High-fidelity speaker',
        '250.00',
        'https://via.placeholder.com/250',
        '16b71c4d-c5ea-4b65-92dc-bc8f3b1c2e99'
    );

INSERT INTO
    `favorites` (`user_id`, `product_id`)
VALUES
    ('7c2d548b-c2f9-48fe-842c-c03a70c8f3fc', 1),
    ('7c2d548b-c2f9-48fe-842c-c03a70c8f3fc', 2);