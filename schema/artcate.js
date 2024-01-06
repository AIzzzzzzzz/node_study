const joi = require('joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()

const id = joi.number().integer().min(1).required()
exports.add_cate_schema = {
    body: {
        name:name,
        alias:alias
    }
}

exports.deletecate = {
    params: {
        id
    }
}

exports.getcate = {
    params: {
        id
    }
}

exports.updatecate = {
    body: {
        name:name,
        alias:alias,
        id:id,
    }
}
