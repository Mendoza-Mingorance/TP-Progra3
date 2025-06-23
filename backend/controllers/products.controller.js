


export const getProducts = async (req, res) =>{
    res.json({message: "trayendo productos"})
}

export const createProduct = async (req, res) =>{
    const {name} = req.body
    res.json({message: `producto de nombre ${name} fue creado`})
}

export const updateProduct = async (req,res) =>{
    const id = req.params.id
    res.json({message:`producto id ${id}`})
}

export const deleteProduct = async (req,res) =>{
    const id = req.params.id
    res.json({message: `producto id ${id} eliminado`})
}


