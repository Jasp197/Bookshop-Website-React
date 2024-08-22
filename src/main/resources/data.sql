DELETE FROM book;
ALTER TABLE book AUTO_INCREMENT = 1001;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1001;

INSERT INTO `category` (`name`) VALUES ('Fantasy'),('Sci-Fi'),('Romance'),('Action'),('Mystery');


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Mexican Gothic', 'Silvia Moreno-Garcia', '', 649, 0, TRUE, FALSE, 1001);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Circe', 'Madeline Miller', '', 749, 0, FALSE, FALSE, 1001);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('A Study in Drowning', 'Ava Reid', '', 549, 0, FALSE, FALSE, 1001);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Princess Bride', 'William Goldman', '', 999, 0, TRUE, FALSE, 1001);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Will of the Many', 'James Islington', '', 849, 0, TRUE, FALSE, 1001);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Three-Body Problem', 'Cixin Liu', '', 1249, 0, FALSE, FALSE, 1002);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Project Hail Mary', 'Andy Weir', '', 999, 0, TRUE, FALSE, 1002);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Martian', 'Andy Weir', '', 1499, 0, TRUE, FALSE, 1002);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Snow Crash', 'Neal Stephenson', '', 1399, 0, FALSE, FALSE, 1002);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Redemption of Time', 'Baoshu', '', 899, 0, TRUE, FALSE, 1002);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('It Ends With Us', 'Jennifer Barnes', '', 1549, 0, TRUE, FALSE, 1003);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('A Court of Thorns and Roses', 'Sarah J Maas', '', 1049, 0, FALSE, FALSE, 1003);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Butcher and Blackbird', 'Brynne Weaver', '', 1999, 0, FALSE, FALSE, 1003);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Flawless', 'Elsie Silver', '', 1799, 0, TRUE, FALSE, 1003);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Woman in White', 'Wilke Collins', '', 649, 0, TRUE, FALSE, 1003);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('A Court of Mist and Fury', 'Sarah J. Maas', '', 849, 0, FALSE, FALSE, 1004);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Weather the Storm', 'Nora Roberts', '', 1249, 0, TRUE, FALSE, 1004);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Daughter of the Siren Queen', 'Tricia Levenseller', '', 649, 0, TRUE, FALSE, 1004);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Daughter of the Moon Goddess', 'Sue Lynn Tan', '', 549, 0, FALSE, FALSE, 1004);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Last Exchange', 'Charles Martin', '', 749, 0, TRUE, FALSE, 1004);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('None of This is True', 'Lisa Jewell', '', 949, 0, TRUE, FALSE, 1005);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Unwedding', 'Ally Condie', '', 649, 0, FALSE, FALSE, 1005);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Those Empty Eyes', 'Charlie Donlea', '', 1149, 0, FALSE, FALSE, 1005);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('The Orphanage by the Lake', 'Daniel G. Miller', '', 1549, 0, TRUE, FALSE, 1005);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id)
VALUES ('Pretty Girls', 'Karin Slaughter', '', 849, 0, TRUE, FALSE, 1005);

