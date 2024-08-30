import React from 'react';
import BjpChart from "../charts/BjpChart";
import CongressChart from "../charts/CongressChart";
import APPChart from "../charts/AAPChart";
import DMKChart from "../charts/DMKChart";
import NPPChart from '../charts/NPPChart';
import BSPChart from '../charts/BSPChart';
import CPIChart from '../charts/CPIChart';
import AITCChart from '../charts/AITCChart';

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
        4: (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                <CPIChart />
            </div>
        ),
        5: (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                <BSPChart />
            </div>
        ),
        6: (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                <DMKChart />
            </div>
        ),
        7: (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                <AITCChart />
            </div>
        ),
        8: (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center' }}>
                <NPPChart />
            </div>
        ),
    };

    return (
        <div style={{ flex: '1', padding: '20px' }}>
            {contentMap[selected] || 'Select a button to see the content'}
        </div>
    );
};

export default Content;
