const Transaction = require('../models/TransactionModel');
const { response } = require('express');
//index, show, store, update, destroy
module.exports = {
    async index (req, res) {
        const { yearMonth } = req.query;
        const transaction = await Transaction.find({
            yearMonth
        });
        return res.json({message: 'Consulta realizada com sucesso!', transaction });
    }
};