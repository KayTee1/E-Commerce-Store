CREATE TABLE
    IF NOT EXISTS `users` (
        `user_id` varchar(36) NOT NULL,
        `username` varchar(50) NOT NULL,
        `email` varchar(50) NOT NULL,
        `hashed_password` varchar(60) NOT NULL,
        `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`user_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE
    IF NOT EXISTS `products` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `product_id` VARCHAR(3) NOT NULL,
        `title` VARCHAR(50) NOT NULL,
        `description` VARCHAR(100) NOT NULL,
        `price` DECIMAL(10, 2) NOT NULL,
        `owner` VARCHAR(36) NOT NULL,
        `image` VARCHAR(255),
        `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (`product_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE
    IF NOT EXISTS `favorites` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `user_id` VARCHAR(36) CHARACTER
        SET
            latin1 COLLATE latin1_swedish_ci NOT NULL,
            `product_id` VARCHAR(3) CHARACTER
        SET
            latin1 COLLATE latin1_swedish_ci NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
            FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
    );

CREATE TABLE
    IF NOT EXISTS `categories` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `category_id` VARCHAR(3) NOT NULL,
        `name` VARCHAR(50) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (`category_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE
    IF NOT EXISTS `product_categories` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `product_id` VARCHAR(3) CHARACTER
        SET
            latin1 COLLATE latin1_swedish_ci NOT NULL,
            `category_id` VARCHAR(3) CHARACTER
        SET
            latin1 COLLATE latin1_swedish_ci NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
            FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

/* Basic categories */
INSERT INTO
    categories (category_id, name)
VALUES
    ('001', 'Electronics');

INSERT INTO
    categories (category_id, name)
VALUES
    ('002', 'Clothing');

INSERT INTO
    categories (category_id, name)
VALUES
    ('003', 'Books');

INSERT INTO
    categories (category_id, name)
VALUES
    ('004', 'Home Appliances');

INSERT INTO
    categories (category_id, name)
VALUES
    ('005', 'Furniture');

INSERT INTO
    categories (category_id, name)
VALUES
    ('006', 'Sports Equipment');

INSERT INTO
    categories (category_id, name)
VALUES
    ('007', 'Beauty Products');

INSERT INTO
    `users` (`user_id`, `username`, `email`, `hashed_password`)
VALUES
    (
        '7c2d548b-c2f9-48fe-842c-c03a70c8f3fc',
        'JohnSmith',
        'Smith@example.com',
        '$2a$12$nklH38sEOS2SRUYDWGVsl.SlaelTEy/l2aznsXsMdY5SmpGM.zDaS'
    );

/*
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
)
INSERT INTO
`favorites` (`user_id`, `product_id`)
VALUES
('7c2d548b-c2f9-48fe-842c-c03a70c8f3fc', 1),
('7c2d548b-c2f9-48fe-842c-c03a70c8f3fc', 2);
 */