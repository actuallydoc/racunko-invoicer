import jsPDF from "jspdf";
import { Company, InvoiceObject, Partner } from "types";

import 'jspdf-autotable';
import autoTable, { RowInput, UserOptions } from "jspdf-autotable";

//!TODO Somehow track the Y pos of the tables so you can dynamically place the content below the table.
//!TODO Implement the missing data to put it inside the PDF (Update the Schema)
export default function generatePDFInvoice(invoice: InvoiceObject): URL {
    let doc = new jsPDF;
    renderPartner(doc, invoice.Partner as Partner)
    renderHeader(doc, invoice.Company as Company, invoice)
    renderOurCompany(doc, invoice.Company as Company, invoice)
    renderTable(doc, invoice.Company as Company, invoice)
    renderPaymentData(doc, invoice, invoice.Partner as Partner, invoice.Company as Company)
    renderFooter(doc, invoice.Company as Company)
    return doc.output('bloburi');
}
const renderPaymentData = (doc: jsPDF, invoice: InvoiceObject, customer: Partner, company: Company) => {
    doc.setFontSize(10);

}
const renderFooter = (doc: jsPDF, company: Company) => {
    doc.line(15, 276, 190, 276);
    doc.text(
        "Vpis v poslovni register pri Ajpes. Matična št: NOt implemented",
        65,
        280
    );
}
const renderTable = (doc: jsPDF, company: Company, invoice: InvoiceObject) => {
    let finalY = 0;
    let options: UserOptions = {
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
            cellPadding: 0.7,
            fontSize: 8,

        },
        startY: finalY + 90,

        head: [["Opis", "Količina", "Cena", "DDV", "Znesek"]],
        body: [['1', 'Simon', 'Sweden'], ['2', 'Karl', 'Norway']],
        theme: "plain",
        columnStyles: { text: { cellWidth: "auto" } },
    }
    autoTable(doc, options);
    console.log(options.startY)
    //this.finalY = autoTable.final;
    ///////////////////////////SKUPAJ , DDV , ZA PLAČILO
    doc.text("Skupaj: " + "skupaj" + "racun.currency", 165, finalY + 3);
    doc.line(164, 4, 190, 4, "F");
    doc.text("DDV: " + "ddvrazlika" + "racun.currency", 167, 8);
    doc.line(166, 9, 190, 9, "F");
    doc.text(
        "Za plačilo: " + "zddvskupaj" + "racun.currency",
        160,
        150
    );
    doc.line(159, 150 + 13, 190, 150 + 13, "F");
    //////////////////////////////////////////
    //this.finalY = doc.lastAutoTable.finalY + 14;

    autoTable(doc, {
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
            cellPadding: 0.7,
            fontSize: 8,

        },
        startY: 200 + 10,
        head: [["Davčna stopnja", "Osnova za DDV", "DDV", "Znesek z DDV"]],
        body: [
            [
                "DDV " + "Not in schema",
                "skupaj" + " racun.currency",
                "ddvrazlika" + "racun.currency",
                "zddvskupaj" + "racun.currency"
            ],
        ],
        theme: "plain",
    });
    //this.finalY = doc.lastAutoTable.finalY;
}

const renderPartner = (doc: jsPDF, customer: Partner) => {
    doc.text(customer.name, 15, 65);
    doc.text(customer.address, 15, 70);
    doc.text(customer.zip, 15, 75);
    if (customer.vat != null) {
        doc.text("ID za DDV kupca: " + customer.vat, 15, 95);
    }

}
const renderHeader = (doc: jsPDF, company: Company, invoice: InvoiceObject) => {
    doc.setFontSize(9).setFont("DejaVu", "normal");
    doc.text("Datum izdaje: Boštanj, " + invoice.invoiceDate, 15, 23);
    doc.text("Datum opr. storitve: " + invoice.services, 15, 27);
    doc.text("Rok plačila: " + invoice.dueDate, 15, 31);
}
const renderOurCompany = (doc: jsPDF, company: Company, invoice: InvoiceObject) => {
    doc.line(131, 15, 131, 54);
    //doc.setFont("normal", "bold");
    doc.text(`${company.name}`, 132, 20);
    //doc.setFontSize(9).setFont("DejaVu", "normal");
    doc.text(`${company.address}`, 132, 25);
    doc.text(`${company.zip} ${company.city}`, 132, 29);
    doc.text(`ID za DDV: SI63048671`, 132, 33);
    doc.text(`IBAN št.: Not implemented`, 132, 37);
    doc.text(`SWIFT: Not implemented`, 132, 41);
    doc.text(`Matična št.: Not implemented`, 132, 45);
    doc.text(`${company.phone}Tel:051/635/122`, 132, 49);
    doc.text(`Račun št: ${invoice.invoiceNumber}-2023`, 132, 53);
}