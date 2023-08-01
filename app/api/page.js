// pages/api/upload.js
import { config } from 'dotenv'
import Airtable from 'airtable'

config()

const base = new Airtable({ apiKey: 'pat97EonjJBvtlYg8.8c8614c2e42c9a84fd853d7019d6f93c8df77229950cf1d7214f3263b322569a' }).base('appuI8SbKMtCgPOZK')
const table = base.table('Signature')

export default async (req, res) => {
    console.log(req.body)
    const { base64Image } = req.body

    try {
        const createdRecord = await table.create([
            {
                fields: {
                    "Name": "User Signature",
                    "File": [
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