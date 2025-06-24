import {connection} from "../database/db.js"

export const getProducts = async (req, res) =>{
    try {
        const sql = `SELECT * FROM products`
        const [rows] = await connection.query(sql)
        res.status(200).json(rows)        
    } catch (err) {
        console.error("Error trayendo productos:",err.message);
        res.status(500).json({message: "Internal server error. Couldn't get products"})
    }
}

export const getProductById = async(req, res) =>{
    try {
        const {id} = req.params
        const sql = `SELECT * FROM products WHERE id = ?`
        const [rows] = await connection.query(sql,[id])

        rows.length > 0 ? res.status(200).json(rows) : res.status(404).json({message: `producto de id ${id} no encontrado`})
    } catch (err) {
        console.error("Error trayendo producto:",err.message);
        res.status(500).json({message: "Internal server error. Couldn't get product"})
    }
}

export const createProduct = async (req, res) =>{
    try {
        const {name, price, description, active} = req.body
        
        const sql = 'INSERT INTO products (name, price, description, active) VALUES (?, ?, ?, ?)';
        const values = [name, price, description, active];

        const [result] = await connection.query(sql, values);

        res.status(200).json({ message: `Producto creado con éxito`, payload: {
            id: result.insertId,
            name,
            price,
            description,
            active
        }
        });

    } catch (error) {
        res.status(500).json({message: "Internal server error. Couldn't create product"})   
    }
}

export const updateProduct = async (req,res) =>{
    const id = req.params.id
    res.json({message:`producto id ${id}`})
}

export const deleteProduct = async (req,res) =>{
    const id = req.params.id
    res.json({message: `producto id ${id} eliminado`})
}


