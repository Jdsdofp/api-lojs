const mongoose = require("../database");



const ProviderSchema = mongoose.Schema({
    codigoProvider: {
        type: Number,
        default: 1,
    },
    nomeFantasia: {
        type: String
    },
    razaoSocial: {
        type: String
    },
    endereco: {
        numero: {
            type: String
        },
        complemento: {
            type: String
        },
        bairro: {
            type: String
        },
        codigoMunicipio: {
            type: String
        },
        cidade: {
            type: String
        },
        uf: {
            type: String
        },
        cep: {
            type: String
        },
        nomePais: {
            type: String
        },
        pessoa: {
            type: String,
            enum: ['JURIDICA', 'FISICA'],
            default: '',
        }
    },

    cnpj: {
        type: String
    },
    inscricaoEstadual: {
        type: String
    },
    email: {
        type: String
    },
    tefelone: {
        type: String
    },
    celular: {
        type: String
    },
    contato: {
        type: String
    }
});

const Provider = mongoose.model('Provider', ProviderSchema);

module.exports = Provider;