import React, { useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import Content from "./components/Content";
import "./components/stylesidebar.css";

const Party = () => {
    const [selected, setSelected] = useState(1);

    const handleSelect = (buttonIndex) => {
        setSelected(buttonIndex);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header />
            <div style={{ flex: '1', display: 'flex', flexDirection: 'row' }}>
                <Sidebar onSelect={handleSelect} />
                <Content selected={selected} />
            </div>
            <Footer />
        </div>
    );
};

export default Party;
