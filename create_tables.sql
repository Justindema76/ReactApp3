CREATE TABLE `recipe_posts`
(
    `id`           INT(11) NOT NULL AUTO_INCREMENT,
    `title`        VARCHAR(255) NOT NULL,
    `name`       VARCHAR(255) NOT NULL,
    `recipe`      TEXT NOT NULL,
    `publish_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `recipe_votes`
(
    `id`         INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `recipe_id`    INT(11) NOT NULL,
    `user_ip`    VARCHAR(50) NOT NULL,
    `vote_type`  ENUM('like', 'dislike') NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`recipe_id`) REFERENCES `recipe_posts` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
