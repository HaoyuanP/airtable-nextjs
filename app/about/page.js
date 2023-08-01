// app/about/page.js
"use client";
import { useRef } from 'react'
import SignaturePad from 'react-signature-canvas'
import axios from 'axios'

export default function AboutPage() {
    const sigCanvas = useRef({})

    // const saveSignature = async () => {
    //     const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    //
    //     const base64Image = dataUrl.split(';base64,')[1];
    //
    //     // Send this to server
    //     console.log('data:image/png;base64,',base64Image)
    //     // console.log(JSON.stringify({ base64Image }));
    //     const res = await axios.post('../api',  JSON.stringify({ base64Image }), {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //
    //     console.log(res)
    //
    //     if (res.data.success) {
    //         alert('Upload successful!')
    //     } else {
    //         alert('Upload failed: ' + JSON.stringify(res.data.error, null, 2))
    //     }
    //
    // }


    return (
        <div>
            <h1>About Page</h1>
            {/*<SignaturePad canvasProps={{width: 500, height: 200}} ref={sigCanvas} />*/}
            {/*<button onClick={saveSignature}>Save Signature</button>*/}
        </div>
    )
}
