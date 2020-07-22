import React, { useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Add } from '@material-ui/icons';
import { Fab }  from '@material-ui/core';
import './styles.css';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({ onSubmit }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <aside>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="description">Descrição</label>
            <input 
              name="description" 
              id="description" 
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="category">Categoria</label>
            <input
              name="category"
              id="category"
              required
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="value">Valor</label>
              <input
                name="value"
                id="value"
                required
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </div>

            <div className="input-block">
              
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
    </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      description,
      category,
    });

    setDescription('');
    setCategory('');
  }

  return (
    <div>
      <div className={classes.root}>
        <Fab color="primary" aria-label="add" variant="extended" onClick={handleOpen}>
          <Add className={classes.extendedIcon} />
          Novo Lançamento
        </Fab>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
