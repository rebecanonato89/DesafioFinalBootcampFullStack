const Transaction = require('../models/TransactionModel');
const { response } = require('express');
//index, show, store, update, destroy
module.exports = {
    async index (req, res) {
        try {
            const { yearMonth } = req.query;
            const transaction = await Transaction.find({
                yearMonth
            }).sort({day : 1});
            return res.status(200).json({ transaction });
        } catch (error) {
            res.status(500).send(error);
        }
    }
};