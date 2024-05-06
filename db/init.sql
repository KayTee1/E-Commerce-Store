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
        `image` MEDIUMTEXT NOT NULL,
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