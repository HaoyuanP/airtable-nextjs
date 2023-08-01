import exp from "constants";

const Airtable = require('airtable');

const base = new Airtable({
    apiKey: 'patEx17jm7cJGRM3n.f10a8a9dbfb25a6dc18caeb854badf730e9d6f99d7cafd6170e072c153180f26',
}).base('appuI8SbKMtCgPOZK');

const table = base('Table 1');

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
                authorization: 'Bearer bcfb85f417dc77b2503ef1557928fd162c5d655f3949fb3402333337b5281de2'
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
                    service: post.fields.Servises,
                    budget: post.fields.budget
                }
            })
        };

        fetch('https://api.webflow.com/collections/64b6ebc7ae6521a1547f1d81/items?live=false', options)
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
                        <span>{post.fields.Servises}</span>
                    </li>
                ))}
            </ul>
        </main>
    );
}

