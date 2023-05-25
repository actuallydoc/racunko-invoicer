import { useState } from "react";
import { Document, pdfjs, Page } from "react-pdf";
export default function PdfViewer({ file }: { file: File }) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);

    const onDocumentLoadSuccess = ({ numPages }: any) => {
        setNumPages(numPages);
    };

    return (
        <div>
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
            <button
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber(pageNumber - 1)}
            >
                Previous
            </button>
            <button
                disabled={pageNumber >= numPages}
                onClick={() => setPageNumber(pageNumber + 1)}
            >
                Next
            </button>
        </div>
    );
};
