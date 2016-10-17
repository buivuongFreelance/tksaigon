INSERT INTO designs(name, type, content, love, views, alias) VALUES('replace', '', '', 60, 600, 'replace');

UPDATE designs SET image='replace_a1.jpg' WHERE alias='replace';

INSERT INTO products(design_alias, root_id, main, price, type) VALUES
("replace", 1, "replace_a1", 179, 1),
("replace", 1, "replace_a2", 179, 0),
("replace", 3, "replace_a3", 179, 1),
("replace", 3, "replace_a4", 179, 0),
("replace", 3, "back_male_black", 179, 0),
("replace", 5, "replace_a5", 179, 1),
("replace", 5, "replace_a6", 179, 0),
("replace", 7, "replace_a7", 179, 1),
("replace", 7, "replace_a8", 179, 0),
("replace", 9, "replace_a9", 179, 1),
("replace", 9, "replace_a10", 179, 0),
("replace", 11, "replace_a11", 179, 1),
("replace", 11, "back_female_black", 179, 0),
("replace", 13, "replace_a13", 179, 1),
("replace", 13, "replace_a14", 179, 0),
("replace", 15, "replace_a15", 179, 1),
("replace", 15, "replace_a16", 179, 0),
("replace", 17, "replace_a17", 179, 1),
("replace", 17, "replace_a18", 179, 0),
("replace", 19, "replace_a19", 179, 1),
("replace", 19, "replace_a20", 179, 0),
("replace", 0, "replace", 0, 0);