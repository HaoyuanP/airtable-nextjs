'use client';
import React, {createContext, useState, useContext, useMemo, useRef} from "react";
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Popup from 'reactjs-popup';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

import SignatureCanvas from "react-signature-canvas";


const UserContext = createContext({
    userName: "",
    address: " ",
    dateTime: null,
    company: " ",
    setUserName: () => {},
    setAddress:() => {},
    setDateTime: () => {},
    setCompany: () => {},

});

export function Application() {
    const [userName, setUserName] = useState(" ");
    const [address, setAddress] = useState(" ");
    const [company, setCompany] = useState(" ");


    // user date select
    const [dateTime, setDateTime] = useState(null);

    const value = useMemo(() => ({ userName, setUserName, address, setAddress, company, setCompany, dateTime, setDateTime}), [userName, dateTime, company, address]);

    const [imageURL, setImageURL] = useState(null);
    const sigCanvas = useRef({});



    // Function to save the signature as data URL
    const saveSignature = () => {
        setImageURL(sigCanvas.current.toDataURL());
    };

    // Function to clear the signature canvas
    const clearSignature = () => {
        sigCanvas.current.clear();
        setImageURL(null);
    };

    const reportTemplateRef = useRef(null);

    return (
        <>
            <UserContext.Provider value={value}>

                <div className="flex h-screen">
                    <div id="userInput" className="w-1/2 h-screen flex flex-col gap-4 p-8 border-r border-gray-300 overflow-y-auto">
                        <div className="text-2xl font-bold mb-4">User Input</div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">User Name:</label>
                            <UserNameInput></UserNameInput>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Company:</label>
                            <UserCompanyInput></UserCompanyInput>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Address:</label>
                            <UserAddressInput></UserAddressInput>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Date:</label>
                            <UserDateInput></UserDateInput>
                        </div>


                        <h1 className="text-3xl my-4">Capture Your Signature</h1>
                        <div className="border-2 border-black">
                            <SignatureCanvas
                                ref={sigCanvas}
                                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                            />
                        </div>
                        <div className="my-4">
                            <button onClick={saveSignature} className="bg-blue-500 text-white px-4 py-2 mx-2 rounded">
                                Save
                            </button>
                            <button onClick={clearSignature} className="bg-red-500 text-white px-4 py-2 mx-2 rounded">
                                Clear
                            </button>
                        </div>

                        <Popup
                            trigger={<button className="bg-blue-500 text-white p-2 rounded"> Submit </button>}
                            modal
                            nested
                        >
                            {close => (
                                <div className="relative p-6 bg-white rounded">
                                    <button className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1" onClick={close}>
                                        &times;
                                    </button>
                                    <div className="text-center text-xl mb-4"> Confirm the Contract </div>
                                    <div className="text-base">
                                        testing
                                    </div>
                                    <div className="text-center mt-4">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                            onClick={async () => {
                                                const requestData = {
                                                    userName,
                                                    company,
                                                    address,
                                                    dateTime: dateTime ? new Date(dateTime).toISOString() : null,  // Convert Date to ISO string
                                                    imageURL,
                                                    imageConfirm: "NO",
                                                };

                                                if (imageURL) {
                                                    requestData.imageConfirm = "YES"
                                                    console.log("imageURL exists: true");
                                                    try {
                                                        const response = await fetch('testing/api/', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                            },
                                                            body: JSON.stringify(requestData),
                                                        });

                                                        const data = await response.json();

                                                        if (response.ok) {
                                                            console.log("successful")
                                                        } else {
                                                            // Handle error (show error message, etc.)
                                                            console.error('Error adding record:', data.error);
                                                        }

                                                    } catch (error) {
                                                        // Handle fetch error
                                                        console.error('Fetch error:', error);
                                                    }

                                                } else {
                                                    console.log("imageURL exists: false");
                                                    try {
                                                        const response = await fetch('testing/api/', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                            },
                                                            body: JSON.stringify(requestData),
                                                        });

                                                        const data = await response.json();

                                                        if (response.ok) {
                                                            console.log("successful")
                                                        } else {
                                                            // Handle error (show error message, etc.)
                                                            console.error('Error adding record:', data.error);
                                                        }

                                                    } catch (error) {
                                                        // Handle fetch error
                                                        console.error('Fetch error:', error);
                                                    }
                                                }
                                                close();
                                            }}
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Popup>


                    </div>
                    <div id="showInfo" className="w-1/2 h-screen p-8 overflow-y-auto tracking-normal">
                        <div className="text-2xl font-bold mb-4">User Information</div>

                        <div ref={reportTemplateRef} id="template_invoice">
                            <UserInfo></UserInfo>
                            {imageURL ? (
                                <div className="flex flex-col items-center">
                                    <h2 className="text-2xl my-4">Your Signature:</h2>
                                    <img src={imageURL} alt="User signature" className="border-2 border-black" />
                                </div>
                            ) : null}

                            <PDFDownloadLink
                                document={<PDFGenerator UserContext={UserContext} />}
                                fileName="recipe.pdf"
                                className="button-background w-full text-center text-color py-2 px-4
                     rounded mt-10">
                                {({blob, url, loading, error}) => (loading
                                    ? 'Loading document...'
                                    : 'Download PDF')}
                            </PDFDownloadLink>
                        </div>
                    </div>
                </div>
            </UserContext.Provider>
        </>
    );
}



function UserNameInput() {
    const { userName, setUserName } = useContext(UserContext);
    const changeHandler = (event) => setUserName(event.target.value);

    return <input className="appearance-none bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={userName}
                  onChange={changeHandler}

    />;
}

function UserDateInput() {
    const { dateTime, setDateTime } = useContext(UserContext);
    const changeHandler = (event) => setDateTime(event);

    return <ReactDatePicker
        selected={dateTime ? new Date(dateTime) : null}
        onChange={changeHandler}
        className="p-2 border rounded"
    />
}

function UserAddressInput() {
    const { address, setAddress } = useContext(UserContext);
    const changeHandler = (event) => setAddress(event.target.value);

    return <input className="appearance-none bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={address}
                  onChange={changeHandler} />;
}

function UserCompanyInput() {
    const { company, setCompany } = useContext(UserContext);
    const changeHandler = (event) => setCompany(event.target.value);

    return <input className="appearance-none bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={company}
                  onChange={changeHandler} />;
}

function UserInfo() {
    const { userName } = useContext(UserContext);
    const { dateTime } = useContext(UserContext);
    const { company } = useContext(UserContext);
    const { address } = useContext(UserContext);


    return(
        <div>

            <h1>DESIGN AGREEMENT</h1>
            <div id= "dad" className="tracking-normal">
                {/*eslint-disable-next-line react/no-unescaped-entities */}
                <p>THIS AGREEMENT (hereinafter "Agreement") is entered into this __<span className="text-red-600">_{dateTime ? new Date(dateTime).toLocaleDateString() : "Not selected"}</span>_ (the "Effective Date"),
                    by and between (NAME)__<span className="text-red-600">{userName}</span>__,
                    a (type of company) __<span className="text-red-600">{company}</span>__, with its principal place of business at
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    (address) __<span className="text-red-600">{address}</span>__ (hereinafter "Client"), and Revolution Youth Inc.,
                    doing business as Equality, a corporation organized and existing under the laws of Vermont,
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    with its principal place of business at 47 Maple St, 212B Burlington, VT 05401 (hereinafter "Agency").
                </p>
            </div>


            <p><strong>1. DESCRIPTION OF SERVICES</strong><br></br>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                The Agency agrees to provide the Client with design services ("Services") as described in Attachment A.</p>

            <p><strong>2. COMPENSATION</strong><br></br>
                In consideration for the Services, Client agrees to pay Agency according to the terms outlined in Attachment B.</p>

            <p><strong>3. TERM AND TERMINATION</strong><br></br>
                This Agreement shall begin on the Effective Date and continue until the Services are completed and delivered, unless otherwise terminated as provided in this Agreement.</p>

            <p><strong>4. OWNERSHIP OF WORK PRODUCT</strong><br></br>
                Upon full payment of all fees, costs, and expenses due, the final deliverables, as described in Attachment A, will become the property of the Client.</p>

            <p><strong>5. CONFIDENTIALITY</strong><br></br>
                Each party agrees to keep confidential and not to disclose to any third party any proprietary or confidential information received from the other party.</p>

            <p><strong>6. INDEMNIFICATION</strong><br></br>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Each party agrees to indemnify and hold harmless the other party from and against all losses, claims, liabilities, damages, and expenses
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                arising out of the party's breach of any representation, warranty, or obligation under this Agreement.</p>

            <p><strong>7. GOVERNING LAW</strong><br></br>
                This Agreement shall be governed by and construed under the laws of Vermont.</p>

            <p><strong>8. ENTIRE AGREEMENT</strong><br></br>

                This Agreement, including any Attachments, constitutes the entire agreement between the parties and supersedes all prior
                agreements and understandings relating to the subject matter hereof.</p>

            <p><strong>9. AMENDMENTS</strong><br></br>
                This Agreement may only be amended by written agreement signed by both parties.IN WITNESS WHEREOF, the parties
                hereto have executed this Agreement as of the date first above written.Client NameRevolution Youth Inc. (DBA Equality)</p>
        </div>



    );
}

const PDFGenerator = () => {


    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#E4E4E4',
            padding: 30,
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
        title: {
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 20,
        },
        content: {
            fontSize: 14,
            lineHeight: 1.5,
            textAlign: 'justify',
        }
    });


    return (

        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>DESIGN AGREEMENT</Text>
                <Text style={styles.content}>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    THIS AGREEMENT (hereinafter "Agreement") is entered into this ___ (the "Effective Date"),
                    by and between (NAME)__,
                    a (type of company) ____, with its principal place of business at
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    (address) ____ (hereinafter "Client"), and Revolution Youth Inc.,
                    doing business as Equality, a corporation organized and existing under the laws of Vermont,
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    with its principal place of business at 47 Maple St, 212B Burlington, VT 05401 (hereinafter "Agency").

                </Text>
            </Page>
        </Document>

    );
}
