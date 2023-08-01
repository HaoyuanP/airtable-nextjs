
import { useRef } from 'react'
import SignaturePad from 'react-signature-canvas'
import axios from 'axios'

export default function SignaturePage() {
    const sigCanvas = useRef({})

    const saveSignature = async () => {
        const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');

        const base64Image = dataUrl.split(';base64,')[1];

        // Send this to server
        const res = await axios.post('/api/upload', { base64Image })

        if (res.data.success) {
            alert('Upload successful!')
        } else {
            alert('Upload failed: ' + res.data.message)
        }
    }

    return (
        <div>
            <SignaturePad canvasProps={{width: 500, height: 200}} ref={sigCanvas} />
            <button onClick={saveSignature}>Save</button>
        </div>
    )
}
