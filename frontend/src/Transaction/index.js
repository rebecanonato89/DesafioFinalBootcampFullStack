import React from 'react';
import api from '../services/api';
import { 
    ListItem, ListItemIcon, 
    ListItemSecondaryAction,
    ListItemText, Avatar, IconButton,
 }  from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import './styles.css';

function Transaction({ transaction }) {

    let mystyle = {
        backgroundColor : "#000",

      };
        if(transaction.type === '-'){
            mystyle = {
                backgroundColor : "#f0a1a8",
              };
        } else {
            mystyle = {
                backgroundColor : "#a1f0dc",
              };
        };

    async function handleDelete(_id) {
        console.log(_id);
        try {
            await api.delete('/'+_id);
      
            //setIncidents(incidents.filter(incident => incident.id !== id));
          } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
          }
    }

  return (
    <ListItem style={mystyle} className="info">

        <ListItemIcon>
            <Avatar>{transaction.day}</Avatar>
        </ListItemIcon>

        <ListItemText className="user-info">
            <strong>{transaction.description}</strong>  
            <span>{transaction.category}</span>
        </ListItemText>

        <p>R${transaction.value}</p>

        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments" >
                <Edit />
            </IconButton>

            <IconButton edge="end" aria-label="comments" onClick={() => handleDelete(transaction._id)} type="button">
                <Delete color="action" />
            </IconButton>
        </ListItemSecondaryAction>

    </ListItem>
  );
}

export default Transaction;