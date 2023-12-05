'use client'
import React, {useRef, useState} from 'react';

import {Document, Page, PDFDownloadLink, StyleSheet, Text, View, Image, PDFViewer,} from '@react-pdf/renderer';
import './styles.css';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SignatureCanvas from 'react-signature-canvas';
import { pdf } from '@react-pdf/renderer';


const InvoicePDF = ({ billFrom, imageUrl}) => { // destructuring props

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            padding: 40,
            paddingHorizontal: 80,
        },

        company: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
        section: {
            margin: 5,
            padding: 5,
            fontSize: 15,
            textAlign:"left",

        },
        header: {
            fontSize: 24,
            marginBottom: 10,
            textAlign: 'center'
        },
        label: {
            fontSize: 12,
            marginBottom: 5,
            paddingBottom: 5,
            lineHeight: "1.5px",
            display:"flex",
        },
        input: {
            marginBottom: 10,
            paddingBottom: 5,
        },

        signature: {
            objectPosition: '50% 50%',
            margin: 10,
            padding: 5,
            justifyContent: 'center',

        },

        container:{
            flexDirection: 'column',
        }

    });

    return (
        <Document>
            <Page style={{paddingTop:50, flexDirection:"column"}}>
                <View>
                    <Text style={styles.header}>
                        LUX
                    </Text>

                    <Text style={{paddingTop:50, textAlign:"center", justifyContent:"center"}}>
                        MASTER CREATIVE SERVICES
                    </Text>
                    <Text style={{paddingTop:20, textAlign:"center", justifyContent:"center"}}>
                        AGREEMENT BETWEEN
                    </Text>

                    <Text style={{paddingTop:20, textAlign:"center", justifyContent:"center"}}>
                        Client
                    </Text>

                    <Text style={{paddingTop:30, textAlign:"center", justifyContent:"center"}}>
                        AND
                    </Text>

                    <Text style={{paddingTop:30, textAlign:"center", justifyContent:"center"}}>
                        Agency
                    </Text>
                </View>
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={{flexDirection: 'column',}}>
                    <Text style={styles.header}>Contract</Text>
                    <Text style={styles.label}>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        THIS AGREEMENT (hereinafter "Agreement") is entered into this _<Text style={styles.input}>{billFrom.date.toLocaleDateString()}</Text>_ (the "Effective Date"),
                        by and between (NAME)_<Text style={styles.input}>{billFrom.name}</Text>_,
                        a (type of company) _<Text style={styles.input}>{billFrom.company}</Text>_, with its principal place of business at
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        (address) _<Text style={styles.input}>{billFrom.address}</Text>_ (hereinafter "Client"), and Revolution Youth Inc.,
                        doing business as Equality, a corporation organized and existing under the laws of Vermont,
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        with its principal place of business at 47 Maple St, 212B Burlington, VT 05401 (hereinafter "Agency").
                    </Text>

                    <Text style={styles.section}>1. DESCRIPTION OF SERVICES</Text>
                    <Text style={styles.label}>{/* eslint-disable-next-line react/no-unescaped-entities */}
                        The Agency agrees to provide the Client with design services ("Services") as described in Attachment A.
                    </Text>

                    <Text style={styles.section}>2. COMPENSATION</Text>
                    <Text style={styles.label}>
                        In consideration for the Services, Client agrees to pay Agency according to the terms outlined in Attachment B.
                    </Text>

                    <Text style={styles.section}>3. TERM AND TERMINATION</Text>
                    <Text style={styles.label}>
                        This Agreement shall begin on the Effective Date and continue until the Services are completed and delivered, unless otherwise terminated as provided in this Agreement.
                    </Text>

                    <Text style={styles.section}>4. OWNERSHIP OF WORK PRODUCT</Text>
                    <Text style={styles.label}>
                        Upon full payment of all fees, costs, and expenses due, the final deliverables, as described in Attachment A, will become the property of the Client.
                    </Text>

                    <Text style={styles.section}>5. CONFIDENTIALITY</Text>
                    <Text style={styles.label}>
                        Each party agrees to keep confidential and not to disclose to any third party any proprietary or confidential information received from the other party
                    </Text>

                    <Text style={styles.section}>6. INDEMNIFICATION</Text>
                    <Text style={styles.label}>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Each party agrees to indemnify and hold harmless the other party from and against all losses, claims, liabilities, damages, and expenses
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        arising out of the party's breach of any representation, warranty, or obligation under this Agreement.
                    </Text>

                    <Text style={styles.section}>7. GOVERNING LAW</Text>
                    <Text style={styles.label}>
                        This Agreement shall be governed by and construed under the laws of Vermont.
                    </Text>

                    <Text style={styles.section}>8. ENTIRE AGREEMENT</Text>
                    <Text style={styles.label}>
                        This Agreement, including any Attachments, constitutes the entire agreement between the parties and supersedes all prior
                        agreements and understandings relating to the subject matter hereof.
                    </Text>

                    <Text style={styles.section}>9. AMENDMENTS</Text>
                    <Text style={styles.label}>
                        This Agreement may only be amended by written agreement signed by both parties.IN WITNESS WHEREOF, the parties
                        hereto have executed this Agreement as of the date first above written.Client NameRevolution Youth Inc. (DBA Equality)
                    </Text>

                </View>
                <View style={{flexDirection:"row", justifyContent:"center", textAlign:"center"}}>
                    <View style={styles.container}>
                        <Text style={{border:'1px solid #8A6BBE',
                            borderRadius:10,
                            width:100,
                            color:"#6A4C9C",
                            backgroundColor: "rgba(106, 76, 156, 0.2)",
                            padding:2,
                            margin:2,
                            textAlign:"center",
                            justifyContent: "center",

                        }}>AGENCY</Text>
                        <Text style={styles.input}>{billFrom.company}</Text>
                        <Text style={styles.input}>{billFrom.address}</Text>
                        <Image style={{width:200,
                            border:'1px solid #8A6BBE',
                            borderRadius:10,
                            margin:2,
                            backgroundColor: "#FCFAF2",

                        }} src={imageUrl}></Image>
                        <Text style={styles.input}>
                            Name: {billFrom.name}
                        </Text>

                        <Text style={styles.input}>
                            date: {billFrom.date.toLocaleDateString()}
                        </Text>
                    </View>

                    <View style={styles.container}>
                        <Text style={{border:'1px solid #8A6BBE',
                            borderRadius:10,
                            width:100,
                            color:"#6A4C9C",
                            backgroundColor: "rgba(106, 76, 156, 0.2)",
                            padding:2,
                            margin:2,
                            textAlign:"center",
                            justifyContent: "center",

                        }}>CLIENT</Text>
                        <Text style={styles.input}>{billFrom.company}</Text>
                        <Text style={styles.input}>{billFrom.address}</Text>
                        <Image style={{width:200,
                            border:'1px solid #8A6BBE',
                            borderRadius:10,
                            margin:2,
                            backgroundColor: "#FCFAF2",

                        }} src={imageUrl}></Image>

                        <Text style={styles.input}>
                            Name: {billFrom.name}
                        </Text>

                        <Text style={styles.input}>
                            Date: {billFrom.date.toLocaleDateString()}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};



const ContractForm = () => {

// state for storing info about user creating Invoice
    const [billFrom, setBillFrom] = useState({
        name: '',
        address: '',
        company: '',
        date: new Date(),
    })


    const handleBillFromData = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setBillFrom({
            ...billFrom,
            [name] : value
        })
    }


    const handleDateChange = (date) => {
        setBillFrom({
            ...billFrom,
            date,
        });
    };

    const handlePrintPDF = async () => {
        const doc = <InvoicePDF billFrom={billFrom} imageUrl={imageURL} />;
        const pdfBlob = await pdf(doc).toBlob();
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
    };


    const [imageURL, setImageURL] = useState(null);
    const sigCanvas = useRef({});
    const [isAccepted, setIsAccepted] = useState(false);


    const saveSignature = () => {
        setImageURL(sigCanvas.current.toDataURL());
        setIsAccepted(true);
    };

    // Function to clear the signature canvas
    const clearSignature = () => {
        sigCanvas.current.clear();
        setImageURL(null);
        setIsAccepted(false);
    };


    return (
        <div className="invoice" id="root">
            <div>
                <h1 className='title'>User Info</h1>

                <div className='firstRow'>
                    <div className='inputName'>
                        <label>Company:</label>
                        <input name="company" className="input" type="text" value={billFrom.company} onChange={handleBillFromData} />
                    </div>
                </div>

                <div className='firstRow'>
                    <div className='inputName'>
                        <label>Name:</label>
                        <input name="name" className="input" type="text" value={billFrom.name} onChange={handleBillFromData} />
                    </div>
                    <div className='inputName'>
                        <label>Address:</label>
                        <textarea name="address" className="textarea" type="text" value={billFrom.address} onChange={handleBillFromData} />
                    </div>
                    <div className='inputName'>
                        <label>Date:</label>
                        <ReactDatePicker selected={billFrom.date} onChange={handleDateChange} className="p-2 border rounded"/>
                    </div>

                </div>

                <div className="border-2 border-black">
                    <SignatureCanvas
                        ref={sigCanvas}
                        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                    />
                </div>
                <div className="my-4">
                    <button onClick={saveSignature} className="bg-blue-500 text-white px-4 py-2 mx-2 rounded">
                        Accept
                    </button>
                    <button onClick={clearSignature} className="bg-red-500 text-white px-4 py-2 mx-2 rounded">
                        Clear
                    </button>
                </div>
                {isAccepted && (
                    <button className='button' onClick={handlePrintPDF}>Print PDF</button>
                )}

                <hr/>
            </div>
        </div>

    );

};

export default ContractForm;
