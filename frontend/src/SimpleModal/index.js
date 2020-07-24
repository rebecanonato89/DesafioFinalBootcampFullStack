import React, { useState }  from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';
import { Add } from '@material-ui/icons';
import { Fab, FormControlLabel, Radio, RadioGroup, TextField }  from '@material-ui/core';
import './styles.css';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);


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
    width: "320px",
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
}));

export default function SimpleModal({ onSubmit }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = React.useState('Despesa');
  const [yearMonthDay, setYearMonthDay] = useState();

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
          <strong>Inclusão de lançamento</strong>
          <RadioGroup aria-label="gender" name="gender1" value={type} onChange={e => setType(e.target.value)} className="input-group">
              <FormControlLabel value="-" control={<RedRadio />} label="Despesa" className="input-block" />
              <FormControlLabel value="+" control={<GreenRadio />} label="Receita" className="input-block" />
          </RadioGroup>
            
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
              <div className={classes.container} noValidate>
                <TextField
                  value={yearMonthDay}
                  onChange={e => setYearMonthDay(e.target.value)}
                  id="yearMonthDay"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
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
      value,
      category,
      yearMonthDay,  
      type,
    });
    setType('');
    setDescription('');
    setCategory('');
    setValue('');
    setYearMonthDay('');
    handleClose();
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
