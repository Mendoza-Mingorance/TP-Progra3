-- Con el insert "ignore" into me aseguro de que no haga los inserts cuando vea duplicados en los atributos UNIQUE
INSERT IGNORE INTO categories (name, description) VALUES
('Tarjetas Madre', 'Componentes principales para la interconexión de todos los demás elementos de hardware.'),
('Tarjetas Gráficas', 'Dispositivos encargados de procesar y renderizar imágenes para la salida de video.'),
('Procesadores', 'El cerebro del sistema, encargado de ejecutar instrucciones y procesar datos.');

INSERT INTO products (name, url_image, description, price,id_category,stock) VALUES 
('ASUS ROG Strix Z790-E Gaming WiFi II', 'https://dlcdnwebimgs.asus.com/files/media/E8F9316B-CB25-42B5-9422-CA99338CDB38/v1/img/spec/connectivity-m.png', 'Motherboard de alto rendimiento para gaming con soporte para procesadores Intel de 14ª/13ª/12ª generación, DDR5, PCIe 5.0, WiFi 7 y soluciones de enfriamiento avanzadas.', 479.99, 1, 50),
('MSI MAG B650 Tomahawk WiFi', 'https://age.uz/upload/webp/resize_cache/fd4/400_400_1/29fv3yy2dnffcian0qbm7ka9wyx25mtg.webp', 'Placa base ATX robusta para procesadores AMD Ryzen 7000/8000/9000, con soporte DDR5, PCIe 4.0, Wi-Fi 6E y soluciones térmicas premium para un rendimiento estable.', 199.99, 1, 75),
('Gigabyte B650 AORUS Elite AX V2', 'https://www.gigabyte.com/FileUpload/Global/KeyFeature/2518/innergigabyte/images/product/summary.png', 'Placa base AM5 para AMD Ryzen 7000/8000/9000, con diseño VRM digital, soporte DDR5, PCIe 5.0 M.2, Wi-Fi 6E y características DIY-friendly.', 199.99, 1, 60),
('ASUS ROG Strix GeForce RTX 4070 Ti SUPER 16GB GDDR6X OC Edition', 'https://dlcdnwebimgs.asus.com/files/media/798C35E3-EF80-4568-9071-F2B4A0F86703/v1/img/kv/pd.png', 'Tarjeta gráfica de alto rendimiento con arquitectura NVIDIA Ada Lovelace, DLSS 3, trazado de rayos avanzado y un diseño térmico robusto con ventiladores Axial-tech.', 949.99, 2,30),
('ASRock AMD Radeon RX 7900 XTX Phantom Gaming 24GB OC', 'https://pg.asrock.com/Graphics-Card/photo/Radeon%20RX%207900%20XTX%20Phantom%20Gaming%2024GB%20OC(L1).png', 'Tarjeta gráfica de gama alta con GPU AMD RDNA 3, 24GB GDDR6, soporte PCIe 4.0, sistema de enfriamiento Phantom Gaming 3X y capacidad para 4K/8K.', 899.99, 2,  25),
('Intel Core i9-14900K', 'https://wiztech.com.ar/assets/images/products/procesador/14900_a.png', 'Procesador de escritorio de 24 núcleos (8 P-cores + 16 E-cores) con hasta 6.0 GHz, 36MB de caché, gráficos Intel UHD Graphics 770 integrados y soporte para DDR4/DDR5.', 599.00, 3, 40),
('AMD Ryzen 9 7950X3D', 'https://mlx.com.ar/wp-content/uploads/CPU012-1-1024x1024.webp', 'Procesador de gaming de 16 núcleos con tecnología AMD 3D V-Cache, hasta 5.7 GHz, 128MB L3 Cache y gráficos AMD Radeon integrados, ideal para gamers y creadores.', 760.99, 3, 35),
('Intel Core i7-14700K', 'https://c1.neweggimages.com/productimage/nb640/19-118-466-04.jpg', 'Procesador de escritorio de 20 núcleos (8 P-cores + 12 E-cores) con hasta 5.6 GHz, 33MB de caché, gráficos Intel UHD Graphics 770 integrados y soporte para DDR4/DDR5.', 380.00, 3, 45);

-- Usuario admin por defecto (contraseña: admin123) Encriptado con https://bcrypt-generator.com/ con saltos de 10
INSERT IGNORE INTO users (email, password, role) VALUES
('admin@admin.com', '$2a$10$05npD/sm4JsoGmLR5B7JceQyZMj..zgiXR9sAI/iGMJLNwW56P4Xa', 'admin');
