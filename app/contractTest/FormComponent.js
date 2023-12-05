'use client'

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Document, Page, PDFDownloadLink, StyleSheet, Text, View} from '@react-pdf/renderer';

function generatePDF(data) {
    const doc = (
        <Document>
            <Page>
                <Text>Name: {data.name}</Text>
                <Text>Company: {data.company}</Text>
                <Text>Address: {data.address}</Text>
                <Text>Date: {data.date.toLocaleDateString()}</Text>
            </Page>
        </Document>
    );
    pdf.render(doc, window.open());
}
function FormComponent() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        address: '',
        date: new Date(),
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            date,
        });
    };

    return (
        <form>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
            <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Company" />
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" />
            <DatePicker selected={formData.date} onChange={handleDateChange} />
            <button type="button" onClick={() => generatePDF(formData)}>Generate PDF</button>
        </form>
    );
}

export default FormComponent;
