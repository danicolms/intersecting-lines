import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const { innerWidth, innerHeight } = window;
    return {
        width: innerWidth - (innerWidth * 0.4),
        height: innerHeight - 100
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        console.log("Hello");
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
