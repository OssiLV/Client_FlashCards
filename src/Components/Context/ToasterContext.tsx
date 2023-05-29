import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToasterContext = () => {
    return (
        <Toaster
            containerStyle={{ position: 'absolute', marginLeft: '70rem', marginTop: '3.4rem' }}
        />
    );
};

export default ToasterContext;
