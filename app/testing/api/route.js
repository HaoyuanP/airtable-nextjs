import Airtable from "airtable";
import {NextResponse} from "next/server";
import moment from 'moment';
export async function POST(req) {

    const data = await req.json()
    console.log(data.imageURL)

    try {
        const Airtable = require('airtable');
        const base = new Airtable({apiKey: 'patMUu3vP5H8XxifB.838d976603feb216260bb61d8c20385e2c23c087c61aa47953092f8d4ce9d3a1'}).base('appG5dHJ4RWAvJgIV');

        await base('Table 2').create([
            {
                "fields": {
                    "Name": data.userName,
                    "Company": data.company,
                    "Address": data.address,
                    "Date": moment.utc(new Date(data.dateTime).toISOString()).format('MM/DD/YYYY'),
                    "url": data.imageURL,
                    "Signature Confirmed": data.imageConfirm
                }
            },

        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
            records.forEach(function (record) {
                console.log(record.getId());
            });
        });

        return NextResponse.json({data})

    } catch (err) {
        console.error(err)
    }

}


