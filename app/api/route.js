// // pages/api/upload.js
// import { config } from 'dotenv'
// import Airtable from 'airtable'
// import {NextResponse} from "next/server";
//
// config()
//
// export async function POST(req) {
//
//     const data = await req.json()
//     const base64Image = data.base64Image;
//     console.log(base64Image)
//
//     try {
//         const Airtable = require('airtable');
//         const base = new Airtable({apiKey: 'patMUu3vP5H8XxifB.838d976603feb216260bb61d8c20385e2c23c087c61aa47953092f8d4ce9d3a1'}).base('appG5dHJ4RWAvJgIV');
//
//         await base('Table 2').create([
//             {
//                 "fields": {
//                     "Name": "testing1",
//                     "Company": " ",
//                     "Address": " ",
//                     "Signature": `data:image/png;base64,${base64Image}`
//                 }
//             },
//             {
//                 "fields": {}
//             }
//         ], function (err, records) {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//             records.forEach(function (record) {
//                 console.log(record.getId());
//             });
//         });
//
//         return NextResponse.json({base64Image})
//
//     } catch (err) {
//         console.error(err)
//     }
//
// }
//
//
// // // import fetch from 'node-fetch';
// // //
// // // export default async (req, res) => {
// // //     if (req.method === 'POST') {
// // //         const { records } = req.body;
// // //
// // //         try {
// // //             const airtableResponse = await fetch('https://api.airtable.com/v0/appuI8SbKMtCgPOZK/tblbxCw3EqarErqEB', {
// // //                 method: 'POST',
// // //                 headers: {
// // //                     'Authorization': 'Bearer pat97EonjJBvtlYg8.8c8614c2e42c9a84fd853d7019d6f93c8df77229950cf1d7214f3263b322569a',
// // //                     'Content-Type': 'application/json'
// // //                 },
// // //                 body: JSON.stringify({ records }),
// // //             });
// // //
// // //             const airtableData = await airtableResponse.json();
// // //
// // //             if (airtableResponse.ok) {
// // //                 res.status(200).json({ success: true, data: airtableData });
// // //             } else {
// // //                 res.status(500).json({ success: false, message: airtableData.error.message });
// // //             }
// // //         } catch (err) {
// // //             console.error(err);
// // //             res.status(500).json({ success: false, message: err.message });
// // //         }
// // //     } else {
// // //         // Handle any other HTTP method
// // //         res.setHeader('Allow', ['POST']);
// // //         res.status(405).end(`Method ${req.method} Not Allowed`);
// // //     }
// // // };
// //
