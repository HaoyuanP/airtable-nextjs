'use client'
import React from "react";
import axios from "axios";
import {PDFDownloadLink} from "@react-pdf/renderer";
import PDFGenerator from "./AgreementPDF";


export default function Page(){
    return(
        <body>
        <main>
            <PDFDownloadLink
                document={<PDFGenerator/>}
                fileName="recipe.pdf"
                className="button-background w-full text-center text-color py-2 px-4
                     rounded mt-10">
                {({blob, url, loading, error}) => (loading

                    ? 'Loading document...'
                    : 'Download PDF')}
            </PDFDownloadLink>

        </main>
        </body>
    )
}