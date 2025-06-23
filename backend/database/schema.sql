CREATE TABLE IF NOT EXISTS categories(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url_image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    id_category INT NOT NULL,
    available ENUM('active', 'inactive', 'out of stock') NOT NULL DEFAULT 'active',
    stock INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_category) REFERENCES categorias(id)
);


CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mail VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM("admin", "manager", "employee")
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_client VARCHAR(55) NOT NULL,
    amount_total DECIMAL(10,2) NOT NULL,
    payment_method ENUM("cash","credit_card", "debit_card", "transfer") NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS products_sales(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_products INT NOT NULL,
    id_sales INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    amount_unit DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_products) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (id_sales) REFERENCES sales(id) ON DELETE CASCADE,
);