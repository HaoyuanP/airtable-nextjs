
import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePage = () => {
    const [imageURL, setImageURL] = useState(null); // To hold the signature image URL
    const sigCanvas = useRef({});

    // Function to save the signature as data URL
    const saveSignature = () => {
        setImageURL(sigCanvas.current.toDataURL());
    };

    // Function to clear the signature canvas
    const clearSignature = () => {
        sigCanvas.current.clear();
        setImageURL(null);
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl my-4">Capture Your Signature</h1>
            <div className="border-2 border-black">
                <SignatureCanvas
                    ref={sigCanvas}
                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                />
            </div>
            <div className="my-4">
                <button onClick={saveSignature} className="bg-blue-500 text-white px-4 py-2 mx-2 rounded">
                    Save
                </button>
                <button onClick={clearSignature} className="bg-red-500 text-white px-4 py-2 mx-2 rounded">
                    Clear
                </button>
            </div>
            {imageURL ? (
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl my-4">Your Signature:</h2>
                    <img src={imageURL} alt="User signature" className="border-2 border-black" />
                </div>
            ) : null}
        </div>
    );
};

export default SignaturePage;
