import React from 'react';
import './SearchBox.css';

const SearchBox = ({ searchChange }) => {
    return (
        <input 
            className='text-input' 
            type='search' 
            placeholder='Robo search' 
            onInput={searchChange}
        ></input>
    )
}

export default SearchBox