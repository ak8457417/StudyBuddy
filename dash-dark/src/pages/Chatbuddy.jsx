import React from 'react';

const Chatbuddy = () => {
    return (
        <div className={'!p-[24px]'}>
            <div style={{ width: "100%", height: "100vh", border: "none" }}>
                <iframe
                    src="http://localhost:8501/"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                />
            </div>
        </div>
    );
};

export default Chatbuddy;
