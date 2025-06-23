INSERT INTO categories (name, description) VALUES
("motherboard", "Tarjetas madre para PC")
("graphic_card", "Tarjetas graficas para PC")
("processor", "Procesadores para PC");

INSERT INTO products (name,url_image,description,  price,id_category,stock) VALUES 
('ASUS ROG Maximus', '', 'Placa base gaming Z790', 499.99, 1, 10),

('NVIDIA RTX 4090', '', 'Tarjeta gráfica flagship', 1599.99, 2, 5),

('AMD Ryzen 9 7950X', '', 'Procesador 16 núcleos', 699.99, 3, 15),

('Gigabyte B650 AORUS', '', 'Placa base AMD AM5', 289.99, 1, 8);


-- Usuario admin por defecto (contraseña: admin123) Encriptado con https://bcrypt-generator.com/ con saltos de 10
INSERT INTO users (email, password, role) VALUES
('admin@admin.com', '$2a$10$05npD/sm4JsoGmLR5B7JceQyZMj..zgiXR9sAI/iGMJLNwW56P4Xa', 'admin');