import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // update path if needed

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await req.json();
  
  // Handle both seatAllotted and seatAccepted fields
  const { seatAllotted, seatAccepted, notification } = body;

  try {
    // Build the update data object dynamically
    const updateData: any = {};
    
    if (seatAllotted !== undefined) {
      updateData.seatAllotted = seatAllotted;
    }
    
    if (seatAccepted !== undefined) {
      updateData.seatAccepted = seatAccepted;
    }
    
    if (notification !== undefined) {
      updateData.notification = notification;
    }

    const updated = await prisma.student.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}