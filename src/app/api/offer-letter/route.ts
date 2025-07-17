// app/api/offer-letter/route.ts

import { NextResponse } from 'next/server';

// Replace this with your actual PDF generation logic
async function generatePdf(): Promise<Buffer> {
  // Example PDF content
  const pdfkit = require('pdfkit');
  const doc = new pdfkit();
  const chunks: Buffer[] = [];

  doc.text('🎓 Your Offer Letter 🎓');
  doc.text('You have been allotted the seat successfully.');
  doc.end();

  return await new Promise((resolve) => {
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

export async function GET() {
  const pdfBuffer = await generatePdf();

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="offer-letter.pdf"',
    },
  });
}
