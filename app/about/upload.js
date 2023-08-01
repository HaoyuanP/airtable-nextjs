// app/api/upload.js
import axios from 'axios'

export default async (req, res) => {
    const { base64Image } = req.body;

    const imageBuffer = Buffer.from(base64Image, 'base64');

    try {
        const airtableResponse = await axios({
            method: 'post',
            url: `https://api.airtable.com/v0/appuI8SbKMtCgPOZK/Signature`,
            headers: {
                'Authorization': `Bearer pat97EonjJBvtlYg8.8c8614c2e42c9a84fd853d7019d6f93c8df77229950cf1d7214f3263b322569a`,
                'Content-Type': `application/json`
            },
            data: {
                fields: {
                    "Name": "User Signature",
                    "File": [
                        {
                            "url": `data:image/png;base64,${base64Image}`
                        }
                    ]
                }
            }
        })

        res.status(200).json({ success: true, data: airtableResponse.data })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}
