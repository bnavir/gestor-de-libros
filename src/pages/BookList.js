import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BooksTable from '../components/BookTable';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAdd = () => {
    navigate('/add');
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Agregar Libro
      </Button>
      <BooksTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default BookList;
