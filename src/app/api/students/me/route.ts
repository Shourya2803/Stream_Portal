  import { auth, currentUser } from "@clerk/nextjs/server";
  import { NextResponse } from "next/server";
  // import prisma from "@/lib/prisma"; // Ensure this path is correct
  // import prisma from "@/lib/prisma"; // Adjust the import path as necessary
  import prisma from "../../../../lib/prisma"





export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Try to find the student
  let student = await prisma.student.findUnique({
    where: { userId },
  });

  // If student doesn't exist, create it
  if (!student) {
    const user = await currentUser();

    student = await prisma.student.create({
      data: {
        userId,
        name: user?.firstName || "Student",
        email: user?.emailAddresses?.[0]?.emailAddress || "",
        phone: user?.phoneNumbers?.[0]?.phoneNumber || "",
        branchChoice1: "",
        branchChoice2: "",
      },
    });
  }
 return NextResponse.json(student);
}