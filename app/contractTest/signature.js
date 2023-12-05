'use client'
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = () => {
    const sigCanvasRef = useRef({});

    const clear = () => {
        sigCanvasRef.current.clear();
    };

    const saveSignature = () => {
        const sigCanvas = sigCanvasRef.current;
        const signature = sigCanvas.toDataURL();
    };

    return (
        <div>
            <SignatureCanvas ref={sigCanvasRef} canvasProps={{ width: 500, height: 200 }} />
            <button onClick={clear}>Clear</button>
            <button onClick={saveSignature}>Save</button>
        </div>
    );
};

export default SignaturePad;
