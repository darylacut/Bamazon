CREATE DATABASE bamazon;

	CREATE TABLE products (
		item_id INTEGER (10) AUTO_INCREMENT,
		product_name VARCHAR (100),
		department_name VARCHAR (100),
		price FLOAT (10),
		stock_quantity  INTEGER (200),
        
        PRIMARY KEY (item_id)
	);

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "XBOX ONE S controller", "games", 60, 20),
		(2, "Hollow Coves Album 'Wanderlust'", "music", 20, 10),
        (3, "Seagate 1TB External SSD", "electronics", 110, 20),
        (4, "The Joy of Less", "books", 20, 30),
        (5, "Bellroy wallet", "accessories", 50, 25),
        (6, "Starbucks Caffe Verona", "beverages", 65.94, 35),
        (7, "Nescafe Dolce Gusto machine", "appliances" , 323.45, 15),
        (8, "AIRISM shirt", "clothing", 15, 50),
        (9, "bluetooth headphones", "electronics", 40, 15),
        (10, "Centrum Multivitamins", "medicines", 250, 10);
        