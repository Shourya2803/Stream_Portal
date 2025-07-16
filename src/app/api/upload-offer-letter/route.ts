import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
// import { uploadFileToCloudinary } from '@/lib/cloudinary';
import { uploadFileToCloudinaryBase64 } from '@/lib/cloudinary';
import { generateOfferLetterPDF } from '@/lib/pdf-generator';

export async function POST(req: Request) {
  try {
    const { studentId } = await req.json();

    if (!studentId) {
      return NextResponse.json({ error: 'Missing studentId' }, { status: 400 });
    }

    // 1. Fetch student
    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // 2. Generate offer letter PDF buffer
    const pdfBuffer = await generateOfferLetterPDF(student);

    // 3. Upload to Cloudinary (fix here)
   const uploadResult = await uploadFileToCloudinaryBase64(pdfBuffer, `offer-letter-${studentId}`) as { secure_url: string };


    // 4. Update DB with URL and notification
    const updated = await prisma.student.update({
      where: { id: studentId },
      data: {
        offerLetterUrl: uploadResult.secure_url,
        notification: '🎉 Your offer letter is ready! Click to download.',
      },
    });

    return NextResponse.json({ success: true, offerLetterUrl: uploadResult.secure_url });
  } catch (err: any) {
    console.error('Error uploading offer letter:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
