// src/pages/EditBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const EditBook = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5000/books/${id}`, book);
      navigate('/');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <h1>Editar Libro</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Título"
          value={book.title || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="author"
          label="Autor"
          value={book.author || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="year"
          label="Año"
          type="number"
          value={book.year || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="genre"
          label="Género"
          value={book.genre || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Guardar
        </Button>
      </form>
    </div>
  );
};

export default EditBook;

