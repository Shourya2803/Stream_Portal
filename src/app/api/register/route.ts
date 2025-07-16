import { auth } from "@clerk/nextjs/server";
import prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
     // ✅ Check if student already exists
    const existingStudent = await prisma.student.findUnique({
      where: { userId }
    });

    if (existingStudent) {
      return NextResponse.json({ error: "Student already registered" }, { status: 400 });
    }

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
            english: parseInt(body.english10),
            math: parseInt(body.maths10),
            science: parseInt(body.science10),
            hindi: parseInt(body.hindi10),
            social: parseInt(body.social10),
          },
        },

        class12: {
          create: {
            physics: parseInt(body.physics12),
            chemistry: parseInt(body.chemistry12),
            math: parseInt(body.maths12),
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
