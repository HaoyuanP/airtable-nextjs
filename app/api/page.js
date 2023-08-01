// pages/api/upload.js
import { config } from 'dotenv'
import Airtable from 'airtable'

config()

const base = new Airtable({ apiKey: 'pat97EonjJBvtlYg8.8c8614c2e42c9a84fd853d7019d6f93c8df77229950cf1d7214f3263b322569a' }).base('appuI8SbKMtCgPOZK')
const table = base.table('tblW2AxFSqPNJJJIs')

export default async (req, res) => {
    console.log(req.body)
    const { base64Image } = req.body

    try {
        const createdRecord = await table.create([
            {
                fields: {
                    "Name": "User Signature",
                    "Signature": [
                        {
                            "url": `data:image/png;base64,${base64Image}`
                        }
                    ]
                }
            }
        ])

        res.status(200).json({ success: true, data: createdRecord })
    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, message: err.message })
    }
}


// import fetch from 'node-fetch';
//
// export default async (req, res) => {
//     if (req.method === 'POST') {
//         const { records } = req.body;
//
//         try {
//             const airtableResponse = await fetch('https://api.airtable.com/v0/appuI8SbKMtCgPOZK/tblbxCw3EqarErqEB', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': 'Bearer pat97EonjJBvtlYg8.8c8614c2e42c9a84fd853d7019d6f93c8df77229950cf1d7214f3263b322569a',
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ records }),
//             });
//
//             const airtableData = await airtableResponse.json();
//
//             if (airtableResponse.ok) {
//                 res.status(200).json({ success: true, data: airtableData });
//             } else {
//                 res.status(500).json({ success: false, message: airtableData.error.message });
//             }
//         } catch (err) {
//             console.error(err);
//             res.status(500).json({ success: false, message: err.message });
//         }
//     } else {
//         // Handle any other HTTP method
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// };

