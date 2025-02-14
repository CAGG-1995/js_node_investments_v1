USE bcjktu0uhjmwgafboa3e;

CREATE TABLE `bcjktu0uhjmwgafboa3e`.`USERS` (
	`user_id` varchar(75) NOT NULL,
	`email` varchar(50) NOT NULL,
	`password` varchar(60) NOT NULL,
	PRIMARY KEY (`user_id`)
);

CREATE TABLE `bcjktu0uhjmwgafboa3e`.`PROFILE` (
    `profile_id` varchar(75) NOT NULL,
	`user_id` varchar(75) NOT NULL,
	`name` varchar(50),
	`father_lastname` varchar(50),
	`mother_lastname` varchar(50),
	`nickname` varchar(25),
	`description` TEXT,
	`birthdate` DATE,
	`old` TINYINT,
	`hobbies` varchar(300),
	`profession` varchar(50),
	`telefhone` varchar(10),
	`zip` varchar(10),
	`registered` DATE,
	`avatar` TEXT
);

CREATE TABLE `bcjktu0uhjmwgafboa3e`.`WORDS` (
	`word_id` varchar(75) NOT NULL,
	`user_id` varchar(75) NOT NULL,
	`word` varchar(30) NOT NULL,
	`meaning` varchar(30) NOT NULL,
  	`noun` varchar(150) NOT NULL,
	`verb` varchar(150) NOT NULL,
  	`preposition` varchar(150) NOT NULL,
	`adverb` varchar(150) NOT NULL,
	`adjective` varchar(150) NOT NULL,
	`conjunction` varchar(150) NOT NULL,
	`synonyms` varchar(150) NOT NULL,
	`examples` varchar(300) NOT NULL,
  PRIMARY KEY (`word_id`)
);

CREATE TABLE `bcjktu0uhjmwgafboa3e`.`PROGRESS_BY_WORD` (
	`progress_by_word_id` varchar(75) NOT NULL,
	`user_id` varchar(75) NOT NULL,
	`word_id` varchar(75) NOT NULL,
	`successes` SMALLINT NOT NULL,
	`wrongs` SMALLINT NOT NULL,
  PRIMARY KEY (`progress_by_word_id`)
);


CREATE TABLE `bcjktu0uhjmwgafboa3e`.`PHRASE` (
	`user_id` varchar(75) NOT NULL,
	`phrase_id` varchar(75) NOT NULL,
	`phrase` varchar(150) NOT NULL,
	`meaning` varchar(200) NOT NULL,
    `translation` varchar(200) NOT NULL,
  PRIMARY KEY (`phrase_id`)
);
