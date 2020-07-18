const Transaction = require('../models/TransactionModel');
const { response } = require('express');
//index, show, store, update, destroy
module.exports = {
    async index (req, res) {
        const transaction = await Transaction.find();
        return res.json(transaction);
    },

    async store (req, res) {
        const { 
            description, 
            value, 
            category, 
            year, 
            month, 
            day,
            yearMonth, 
            yearMonthDay, 
            type 
        } = req.body;

        let transaction = await Transaction.findOne({ description, value, category, year, month, day });
        if(!transaction){
            transaction = await Transaction.create({
                description, 
                value, 
                category, 
                year, 
                month, 
                day,
                yearMonth, 
                yearMonthDay, 
                type });
        }
        return res.json({ message: 'Dados cadastrados com sucesso!', dados: transaction });
    }

};