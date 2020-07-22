import React from 'react';
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
            <IconButton edge="end" aria-label="comments">
            <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="comments">
            <Delete color="action" />
            </IconButton>
        </ListItemSecondaryAction>

    </ListItem>
  );
}

export default Transaction;