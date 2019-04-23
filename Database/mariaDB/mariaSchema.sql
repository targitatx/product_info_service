DROP DATABASE IF EXISTS product_info;

CREATE DATABASE product_info;

USE product_info;

CREATE TABLE products (
  sku INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  photo_url VARCHAR(200) NOT NULL,
  product_description TEXT NOT NULL, 
  PRIMARY KEY (sku)
);

LOAD DATA INFILE '/Users/davidcastillo/Desktop/Code/HRATX40_Sprints/product_info_service/Database/tonzOData.csv' INTO TABLE products FIELDS TERMINATED BY ',' IGNORE 1 LINES;
