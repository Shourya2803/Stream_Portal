import jsPDF from 'jspdf';

export async function generateOfferLetterPDF(student: any): Promise<Buffer> {
  const doc = new jsPDF();

  // Add content
  doc.setFontSize(20);
  doc.text('Offer Letter', 105, 30, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text(`Dear ${student.name},`, 20, 60);
  
  doc.text(`We are pleased to offer you admission to the ${student.seatAllotted} branch.`, 20, 80);
  
  doc.text('Thank you for choosing us.', 20, 100);

  // Convert to buffer
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  
  return pdfBuffer;
}