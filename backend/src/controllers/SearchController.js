const Transaction = require('../models/TransactionModel');
const { response } = require('express');
//index, show, store, update, destroy
module.exports = {
    async index (req, res) {
        const { yearMonth } = req.query;
       console.log(yearMonth);
        const transaction = await Transaction.find({
            yearMonth
        }).sort({day : 1});
        console.log("Sucesso");
        return res.json({message: 'Consulta realizada com sucesso!', transaction });
    }
};