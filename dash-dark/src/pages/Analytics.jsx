import React from 'react';

const Analytics = () => {
    return (
        <div>
            <div className={'!p-[24px]'}>
                <div style={{width: "100%", height: "100vh", border: "none"}}>
                    {/*<iframe*/}
                    {/*    src="http://localhost:5176"*/}
                    {/*    width="100%"*/}
                    {/*    height="100%"*/}
                    {/*    style={{ border: "none" }}*/}
                    {/*/>*/}
                    hi
                    <iframe width="560" height="315"
                            src="https://www.youtube.com/embed/rwxRoYzwkyM"
                            frameBorder="0"
                            allowFullScreen>
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
