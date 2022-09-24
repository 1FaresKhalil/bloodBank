/* 
you must run this file by yourself to create the database schema
*/

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "blood_bank",
  password: "12345",
});

db.execute(
  "    CREATE TABLE `blood_bank`.`role` (\
        `roleID` INT UNSIGNED NOT NULL AUTO_INCREMENT,\
        `role_name` VARCHAR(255) NOT NULL,\
        `role_description` TEXT NOT NULL,\
        PRIMARY KEY (`roleID`),\
        UNIQUE INDEX `roleID_UNIQUE` (`roleID` ASC) VISIBLE,\
        UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC) VISIBLE);"
);

db.execute(
  " CREATE TABLE `blood_bank`.`user` (\
    `userID` INT UNSIGNED NOT NULL AUTO_INCREMENT,\
    `email` VARCHAR(320) NOT NULL,\
    `name` VARCHAR(255) NOT NULL,\
    `password` VARCHAR(255) NOT NULL,\
    `phone` VARCHAR(15) NULL,\
    `blood_type` VARCHAR(3) NULL,\
    `last_login` DATETIME NOT NULL,\
    `created_at` DATETIME NOT NULL,\
    `role` INT UNSIGNED NOT NULL,\
    PRIMARY KEY (`userID`),\
    UNIQUE INDEX `idnew_table_UNIQUE` (`userID` ASC) VISIBLE,\
    UNIQUE INDEX `e_UNIQUE` (`email` ASC) VISIBLE,\
    INDEX `role_idx` (`role` ASC) VISIBLE,\
    CONSTRAINT `role`\
      FOREIGN KEY (`role`)\
      REFERENCES `blood_bank`.`role` (`roleID`)\
      ON DELETE NO ACTION\
      ON UPDATE NO ACTION);"
);
/*
CREATE TABLE `blood_bank`.`user` (
  `userID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(320) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(15) NULL,
  `blood_type` VARCHAR(3) NULL,
  `last_login` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL,
  `role` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE INDEX `idnew_table_UNIQUE` (`userID` ASC) VISIBLE,
  UNIQUE INDEX `e_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `role_idx` (`role` ASC) VISIBLE,
  CONSTRAINT `role`
    FOREIGN KEY (`role`)
    REFERENCES `blood_bank`.`role` (`roleID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
*/

db.execute(
  "CREATE TABLE `blood_bank`.`blood_request` (\
  `blood_requestID` INT UNSIGNED NOT NULL AUTO_INCREMENT,\
  `location` VARCHAR(400) NOT NULL,\
  `timestamp` DATETIME NOT NULL,\
  PRIMARY KEY (`blood_requestID`),\
  UNIQUE INDEX `idnew_table_UNIQUE` (`blood_requestID` ASC) VISIBLE);"
);

db.execute(
  "CREATE TABLE `blood_bank`.`donation_history` (\
  `donation_historyID` INT UNSIGNED NOT NULL AUTO_INCREMENT,\
  `blood_requestID` INT UNSIGNED NOT NULL,\
  `userID` INT UNSIGNED NOT NULL,\
  `timestamp` DATETIME NOT NULL,\
  PRIMARY KEY (`donation_historyID`),\
  UNIQUE INDEX `donation_historyID_UNIQUE` (`donation_historyID` ASC) VISIBLE,\
  INDEX `blood_requestID_idx` (`blood_requestID` ASC) VISIBLE,\
  INDEX `userID_idx` (`userID` ASC) VISIBLE,\
  CONSTRAINT `blood_requestID`\
    FOREIGN KEY (`blood_requestID`)\
    REFERENCES `blood_bank`.`blood_request` (`blood_requestID`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION,\
  CONSTRAINT `userID`\
    FOREIGN KEY (`userID`)\
    REFERENCES `blood_bank`.`user` (`userID`)\
    ON DELETE NO ACTION\
    ON UPDATE NO ACTION);"
);

db.execute(
  "CREATE TABLE `blood_bank`.`chat` (\
    `chatID` INT UNSIGNED NOT NULL AUTO_INCREMENT,\
    `user1ID` INT UNSIGNED NOT NULL,\
    `user2ID` INT UNSIGNED NOT NULL,\
    `created_at` DATETIME NOT NULL,\
    PRIMARY KEY (`chatID`),\
    UNIQUE INDEX `idchat_UNIQUE` (`chatID` ASC) VISIBLE,\
    INDEX `user1ID_idx` (`user1ID` ASC) VISIBLE,\
    INDEX `user2ID_idx` (`user2ID` ASC) VISIBLE,\
    CONSTRAINT `user1ID`\
      FOREIGN KEY (`user1ID`)\
      REFERENCES `blood_bank`.`user` (`userID`)\
      ON DELETE NO ACTION\
      ON UPDATE NO ACTION,\
    CONSTRAINT `user2ID`\
      FOREIGN KEY (`user2ID`)\
      REFERENCES `blood_bank`.`user` (`userID`)\
      ON DELETE NO ACTION\
      ON UPDATE NO ACTION);"
);

db.execute(
  "CREATE TABLE `blood_bank`.`message` (\
    `messageID` INT UNSIGNED NOT NULL AUTO_INCREMENT,\
    `text` TEXT NOT NULL,\
    `timestamp` DATETIME NOT NULL,\
    `seen_at` DATETIME NOT NULL,\
    `senderID` INT UNSIGNED NOT NULL,\
    `chatID` INT UNSIGNED NOT NULL,\
    PRIMARY KEY (`messageID`),\
    UNIQUE INDEX `idmessage_UNIQUE` (`messageID` ASC) VISIBLE,\
    INDEX `userID_idx` (`senderID` ASC) VISIBLE,\
    INDEX `chatID_idx` (`chatID` ASC) VISIBLE,\
    CONSTRAINT `senderID`\
      FOREIGN KEY (`senderID`)\
      REFERENCES `blood_bank`.`user` (`userID`)\
      ON DELETE NO ACTION\
      ON UPDATE NO ACTION,\
    CONSTRAINT `chatID`\
      FOREIGN KEY (`chatID`)\
      REFERENCES `blood_bank`.`chat` (`chatID`)\
      ON DELETE NO ACTION\
      ON UPDATE NO ACTION);"
);

//--------------------------------------------------
//queries

/*
role

CREATE TABLE `blood_bank`.`role` (
  `roleID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(255) NOT NULL,
  `role_description` TEXT NOT NULL,
  PRIMARY KEY (`roleID`),
  UNIQUE INDEX `roleID_UNIQUE` (`roleID` ASC) VISIBLE,
  UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC) VISIBLE);
*/

/*
user

CREATE TABLE `blood_bank`.`user` (
  `userID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(15) NULL,
  `blood_type` VARCHAR(3) NULL,
  `last_lgoin` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL,
  `role` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE INDEX `iduser_UNIQUE` (`userID` ASC) VISIBLE,
  INDEX `roleID_idx` (`role` ASC) VISIBLE,
  CONSTRAINT `roleID`
    FOREIGN KEY (`role`)
    REFERENCES `blood_bank`.`role` (`roleID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
*/

/*
blood request

CREATE TABLE `blood_bank`.`blood_request` (
  `idnew_table` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(400) NOT NULL,
  `timestamp` DATETIME NOT NULL,
  PRIMARY KEY (`idnew_table`),
  UNIQUE INDEX `idnew_table_UNIQUE` (`idnew_table` ASC) VISIBLE);
*/

/*
donation history

CREATE TABLE `blood_bank`.`donation_history` (
  `donation_historyID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `blood_requestID` INT UNSIGNED NOT NULL,
  `userID` INT UNSIGNED NOT NULL,
  `timestamp` DATETIME NOT NULL,
  PRIMARY KEY (`donation_historyID`),
  UNIQUE INDEX `donation_historyID_UNIQUE` (`donation_historyID` ASC) VISIBLE,
  INDEX `blood_requestID_idx` (`blood_requestID` ASC) VISIBLE,
  INDEX `userID_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `blood_requestID`
    FOREIGN KEY (`blood_requestID`)
    REFERENCES `blood_bank`.`blood_request` (`blood_requestID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userID`
    FOREIGN KEY (`userID`)
    REFERENCES `blood_bank`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
*/

/*
chat

CREATE TABLE `blood_bank`.`chat` (
  `chatID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user1ID` INT UNSIGNED NOT NULL,
  `user2ID` INT UNSIGNED NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`chatID`),
  UNIQUE INDEX `idchat_UNIQUE` (`chatID` ASC) VISIBLE,
  INDEX `user1ID_idx` (`user1ID` ASC) VISIBLE,
  INDEX `user2ID_idx` (`user2ID` ASC) VISIBLE,
  CONSTRAINT `user1ID`
    FOREIGN KEY (`user1ID`)
    REFERENCES `blood_bank`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user2ID`
    FOREIGN KEY (`user2ID`)
    REFERENCES `blood_bank`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
*/

/*
message

CREATE TABLE `blood_bank`.`message` (
  `messageID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `text` TEXT NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `seen_at` DATETIME NOT NULL,
  `senderID` INT UNSIGNED NOT NULL,
  `chatID` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`messageID`),
  UNIQUE INDEX `idmessage_UNIQUE` (`messageID` ASC) VISIBLE,
  INDEX `userID_idx` (`senderID` ASC) VISIBLE,
  INDEX `chatID_idx` (`chatID` ASC) VISIBLE,
  CONSTRAINT `senderID`
    FOREIGN KEY (`senderID`)
    REFERENCES `blood_bank`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `chatID`
    FOREIGN KEY (`chatID`)
    REFERENCES `blood_bank`.`chat` (`chatID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
*/
