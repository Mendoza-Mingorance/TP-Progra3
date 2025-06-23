
export const loginView = (req, res) =>{
    res.render('login')
}

export const dashboardView = async (req, res) =>{
    res.render('dashboard')
}

export const createProductView = async (req, res) =>{
    res.render('createProduct')
}

export const updateProductView = async (req, res) => {
    res.render('updateProduct')
}

export const deleteProductView = async (req, res) => {
    res.render('deleteProduct')
}