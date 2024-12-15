import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, studyGoal, dailyStudyHours, interestedSubjects } = body;

    // Validate input
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Update user with onboarding data
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        onboarded: true,
        studyGoal,
        dailyStudyHours,
        interestedSubjects
      }
    });

    return NextResponse.json({ 
      message: "Onboarding data saved successfully", 
      user: updatedUser 
    }, { status: 200 });

  } catch (error) {
    console.error("Onboarding data save error:", error);
    return NextResponse.json({ 
      message: "Failed to save onboarding data", 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}