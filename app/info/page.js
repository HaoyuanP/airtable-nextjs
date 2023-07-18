import exp from "constants";

const Airtable = require('airtable');

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

const table = base(process.env.AIRTABLE_TABLE_NAME);

// maps over the records, calling minifyRecord, giving us required data
const getMinifiedRecords = records => {
    return records.map(record => minifyRecord(record));
};

// gets the data we want and puts it into variables
const minifyRecord = record => {
    return {
        id: record.id,
        fields: record.fields,
    };
};


export default async function getPosts() {
    const records = await table.select({}).all();
    const minifiedRecords = await getMinifiedRecords(records);

    minifiedRecords?.map(post =>{
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: process.env.WEBFLOW_API_KYE
            },
            body: JSON.stringify({
                fields: {
                    slug: post.fields.Name,
                    name: post.fields.Name,
                    _archived: false,
                    _draft: false,
                    phonnumber: post.fields.PhoneNumber,
                    'email-2': post.fields.Email,
                    company: post.fields.Company,
                    service: post.fields.Servise,
                    budget: post.fields.budget
                }
            })
        };

        fetch('https://api.webflow.com/collections/64b6d108c9c1a624e6ee2340/items?live=false', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    })

    return(
        <main>
            <h1>Airtable demo</h1>
            <ul>
                {minifiedRecords?.map(post => (
                    <li key={post.id}>
                        <span>{post.fields.Name }</span>
                        <span>{post.fields.Company }</span>
                        <span>{post.fields.budget}</span>
                        <span>{post.fields.Email}</span>
                        <span>{post.fields.PhoneNumber}</span>
                        <span>{post.fields.Servise}</span>
                    </li>
                ))}
            </ul>
        </main>
    );
}

