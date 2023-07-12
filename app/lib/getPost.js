import exp from "constants";

const Airtable = require('airtable');

const base = new Airtable({
    apiKey: "patEx17jm7cJGRM3n.f10a8a9dbfb25a6dc18caeb854badf730e9d6f99d7cafd6170e072c153180f26",
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

    console.log(minifiedRecords);

    return minifiedRecords;
}

