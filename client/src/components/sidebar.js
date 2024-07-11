import React from 'react';

const Sidebar = ({ onSelect }) => {
    return (
        <div className="sidebar" style={{ width: '14%', background: '#2d2c38', padding: '10px' }}>
            <button onClick={() => onSelect(1)}>Bharatiya Janata Party (BJP)</button>
            <button onClick={() => onSelect(2)}>Indian National Congress (INC)</button>
            <button onClick={() => onSelect(3)}>Aam Aadmi Party (AAP)</button>
            <button onClick={() => onSelect(4)}>Communist Party of India (CPI)</button>
            <button onClick={() => onSelect(5)}>Bahujan Samaj Party (BSP)</button>
            <button onClick={() => onSelect(6)}>Nationalist Congress Party (NCP)</button>
            <button onClick={() => onSelect(7)}>All India Trinamool Congress (AITC)</button>
            <button onClick={() => onSelect(8)}>National People's Party (NPP)</button>
        </div>
    );
};

export default Sidebar;