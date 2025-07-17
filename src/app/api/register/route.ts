import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth(); // ✅ Removed 'await'
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Received body:", body);

    // ✅ Check if student already exists
    const existingStudent = await prisma.student.findUnique({
      where: { userId }
    });

    if (existingStudent) {
      return NextResponse.json({ error: "Student already registered" }, { status: 400 });
    }

    // ✅ Create student entry with nested marks
    const student = await prisma.student.create({
      data: {
        userId,
        name: body.name,
        email: body.email,
        phone: body.phone,
        branchChoice1: body.branch,
        branchChoice2: "",

        class10: {
          create: {
            english: parseInt(body.english10) || 0,
            math: parseInt(body.maths10) || 0,
            science: parseInt(body.science10) || 0,
            hindi: parseInt(body.hindi10) || 0,
            social: parseInt(body.social10) || 0,
          },
        },

        class12: {
          create: {
            physics: parseInt(body.physics12) || 0,
            chemistry: parseInt(body.chemistry12) || 0,
            math: parseInt(body.maths12) || 0,
          },
        },
      },
    });

    return NextResponse.json({ success: true, student });
  } catch (error: any) {
    console.error("Error in /api/register:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
