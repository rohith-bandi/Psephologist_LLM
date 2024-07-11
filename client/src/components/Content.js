import React from 'react';
import BjpChart from "../charts/BjpChart";
import CongressChart from "../charts/CongressChart";
import APPChart from "../charts/AAPChart";

const Content = ({ selected }) => {
    const contentMap = {
        1: (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                
                <BjpChart />
            </div>
        ),
        2: (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                <CongressChart />
            </div>
        ),
        3: (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                <APPChart />
            </div>
        ),
        4: 'Content for Button 4',
        5: 'Content for Button 5',
        6: 'Content for Button 6',
        7: 'Content for Button 7',
        8: 'Content for Button 8',
    };

    return (
        <div style={{ flex: '1', padding: '20px' }}>
            {contentMap[selected] || 'Select a button to see the content'}
        </div>
    );
};

export default Content;
