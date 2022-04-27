const Product = require("../models/products");

//CADASTRANDO OS PRODUTOS
module.exports.product = async (req, res) => {
    const { description } = req.body;
    try {
        if (await Product.findOne({ description })) {
            return res.status(400).send({ erro: 'Produto já cadastrado com essa descrição' })
        }
        const product = await Product.create(req.body)

        return res.send({ product });

    } catch (error) {
        res.status(400).send({ erro: 'Erro ao executar a solicição na POST/PRODUCTS - productControllers' })
    }

}

//PROCURANDO POR UM PRODUTO
module.exports.productOne = async (req, res) => {
    try {
        const product = await Product.find({
            "$or": [
                { codigo: { $regex: req.params.product } },
                { catergory: { $regex: req.params.product } },
                { description: { $regex: req.params.product } }
            ]
        });

        return res.status(200).send(product);
    } catch (error) {
        console.log("HOUVE UM ERRO NA ROTA PRODUCTONE: ==> ", error);
    }
}

//LISTANDO TODOS OS PRODUTOS GERAL
module.exports.allProducts = async (req, res) => {
    try {
        const product = await Product.find()
        res.status(200).send(product)
    } catch (error) {
        console.log("HOUVE UM ERRO NA ROTA ALLPRODUCTS: ==> ", error)
    }
}

//ATUALIZANDO PRODUTO
module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { description, catergory, price, profitPercentage, thumbnail, minStock } = req.body;
    const data = {
        description, catergory, price, profitPercentage, thumbnail, minStock
    };

    try {
        const product = await Product.findByIdAndUpdate(id, data, { new: true });
        res.status(200).send(product)
    } catch (error) {
        console.log("HOUVE UM ERRO NA ROTA UPDATE: ==> ", error);
    }
}

//DELETANDO PRODUTO
module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.deleteOne({ _id: id }, { new: true });
        res.status(300).send({ status: "Produto deletado com sucesso!" });
    } catch (error) {
        console.log("HOUVE UM ERRO NA ROTA DELETEPRODUCT: ==> ", error)
    }
}