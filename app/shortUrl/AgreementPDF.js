'use client'
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


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
                    by and between (NAME)___,
                    a (type of company) __<span className="text-red-600">hhhhh</span>__, with its principal place of business at
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

export default PDFGenerator;