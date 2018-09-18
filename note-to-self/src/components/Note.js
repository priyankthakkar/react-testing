import React from 'react';

const Note = props => {
    const { note } = props;

    return (
        <div className='note'>
            <p>{note.text}</p>
        </div>
    );
};

export default Note;