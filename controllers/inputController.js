const InputProduct = require("../models/inputProducts");
const Product = require("../models/products");
const ObjectID = require("mongoose").Types.ObjectId;

//CRIANDO A ENTRADA DO PRODUTO E NOTA
module.exports.inputProduct = async (req, res) => {
    try {

        const id = await InputProduct.find().sort({ _id: 'DESC' });;
        var i = 0;
        for (; i < id.length; i++) { }
        const code = id[0] == null ? 1 : id[0].id_input += 1;
        const newInput = await InputProduct.create({
            id_input: code,
            nf: req.body.nf,
            dateNf: req.body.dateNf,
            provider: ObjectID(req.body.provider)
        });
        await newInput.save()

        return res.status(200).send(newInput)

    } catch (error) {
        console.log("houve um erro aqui na inputController  =>", error)

        return res.status(400).json(error.errors)

    }
}

//LANÇANDO A ENTRADA DO PRODUTO NA NOTA
module.exports.createInput = async (req, res) => {
    try {
        //procurando a entrada com base no utimo lançamento
        const input = await InputProduct.findOne({ id_input: req.params.input })

        const product = await Product.findOne({ _id: req.body.productId })
        if (req.body.quantity == 0) {
            return res.status(400).send({ error: 'Quantidade incorreta' })
        }

        if (req.body.price == 0 || typeof req.body.price == undefined) {
            return res.status(400).send({ error: 'Preço invalido' })
        }
        const estoqueAtual = product.quantity;
        product.quantity = estoqueAtual + req.body.quantity;
        product.price = req.body.price;

        const { productId, quantity } = req.body;
        const subInputs = { productId, quantity };

        if (input.products.includes(ObjectID(product._id))) {
            return res.status(500).send({ error: 'Produto já incluso' })
        } else {
            if (!input.products.includes(ObjectID(product._id))) {
                const productCurrent = await product.save()
                const inputProduct = await InputProduct.findOneAndUpdate({ _id: input._id }, {
                    $push: { products: productCurrent },
                    $addToSet: { productsInputs: subInputs }
                }, { new: true }).populate('products')

                return res.status(200).send(inputProduct)
            }
        }

    } catch (error) {
        console.log("houve um erro aqui na createInput  =>", error)

        return res.status(400).json(error)

    }
}

//MOSTRANDO TODAS ENTRADAS
module.exports.getAllInputs = async (req, res) => {
    try {
        const inputs = await InputProduct.find().populate({ path: 'products', select: '-_id codigo description quantity price' }).populate({ path: 'provider', select: '-_id codigoProvider nomeFantasia razaoSocial cnpj' })
        return res.status(200).send(inputs)
    } catch (error) {
        console.log("houve um erro aqui na inputController  getAllInputs => ", error)

        return res.status(400).json(error.errors)
    }
}

//EDITANDO ENTRADA
module.exports.editInput = async (req, res) => {
    try {
        const id_input = req.params.input;
        const { nf, dateNf, provider } = req.body;
        const input = await InputProduct.findOneAndUpdate({ id_input: id_input }, {
            nf: nf,
            dateNf: dateNf,
            provider: ObjectID(provider)
        }, { new: true }).populate({ path: "products" }).populate({ path: 'provider', select: '-_id codigoProvider nomeFantasia razaoSocial cnpj' });

        return res.status(200).send(input);

    } catch (error) {
        console.log(error)
    }
}

//DELETANDO PRODUTO DA ENTRADA
module.exports.deletInput = async (req, res) => {

    try {

        const input = await InputProduct.findOne({ id_input: req.params.input })

        let filter = input.productsInputs.filter(id =>
            id.productId == req.body.productId
        )

        const dataProduct = filter[0];
        const { productId } = dataProduct;

        const product = await Product.findOne({ _id: ObjectID(req.body.productId) })

        const estoqueAtual = product.quantity;
        const entradaEstoque = dataProduct.quantity;
        
        const deleteProduct = await InputProduct.findOneAndUpdate(req.body.productId, {
            $pull: {products: ObjectID(req.body.productId)}
        },{new: true})
        
        if(deleteProduct){
            product.quantity = estoqueAtual - entradaEstoque;
            const excluProduct = await product.save()
            
            if(excluProduct){
                const subInputs = await InputProduct.findOneAndUpdate(req.params.input, {
                    $pull: {productsInputs: {_id: ObjectID(dataProduct._id)}}
                },{new: true})
            }
        }
        return res.status(200).send(input)

    } catch (error) {
        console.log("")
    }
}