const Provider = require("../models/provider");

module.exports.createProvider = async (req, res) => {

    try {

        const id = await Provider.find().sort({ _id: 'DESC' });
        var i = 0;
        for (; i < id.length; i++) { }
        const code = id[0] == null ? 1 : id[0].codigoProvider += 1;

        const {
            nomeFantasia,
            razaoSocial,
            endereco,
            cnpj,
            inscricaoestadual,
            email,
            tefelone,
            celular,
            contato } = req.body;

        const newProvider = await Provider.create({
            codigoProvider: code,
            nomeFantasia,
            razaoSocial,
            endereco,
            cnpj,
            inscricaoestadual,
            email,
            tefelone,
            celular,
            contato
        });

        return res.status(200).send(newProvider);

    } catch (error) {
        console.log("HOUVE UM ERRO AQUI NA providerController => ", error)
    }
}