export const fetchAllCategoriesModel = async () => {
    try {
        let sql = `SELECT * FROM categories`;

        const [rows] = await connection.query(sql, filters);

        return rows;
    } catch (error) {
        console.error('Error en modelo, trayendo productos:', error.message);
        throw new Error('Error trayendo productos del modelo');
    }
};
