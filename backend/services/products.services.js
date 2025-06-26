import { connection } from "../database/db.js";

export const fetchProducts = async (queryParams) => {
    const {
        name,
        available,
        id_category,
        minPrice,
        maxPrice,
        sort,
        order,
        limit,
        offset,
    } = queryParams;

    const sortValids = ['name', 'price', 'stock'];
    const orderValid = ['asc', 'desc'];

    let sql = `SELECT * FROM products WHERE 1=1`;
    const filters = [];

    if (available) {
        sql += ` AND available = ?`;
        filters.push(available);
    }

    if (id_category) {
        sql += ` AND id_category = ?`;
        filters.push(id_category);
    }

    if (minPrice) {
        sql += ` AND price >= ?`;
        filters.push(Number(minPrice));
    }

    if (maxPrice) {
        sql += ` AND price <= ?`;
        filters.push(Number(maxPrice));
    }

    if (name) {
        sql += ` AND name LIKE ?`;
        filters.push(`%${name}%`);
    }

    const sortBy = sortValids.includes(sort) ? sort : 'name';
    const sortOrder = orderValid.includes(order?.toLowerCase())
        ? order.toUpperCase()
        : 'ASC';

    sql += ` ORDER BY ${sortBy} ${sortOrder}`;

    if (limit) {
        sql += ` LIMIT ?`;
        filters.push(Number(limit));
    }

    if (offset) {
        sql += ` OFFSET ?`;
        filters.push(Number(offset));
    }

    const [rows] = await connection.query(sql, filters);
    return rows;
};
