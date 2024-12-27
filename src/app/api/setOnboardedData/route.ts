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

    // Convert interestedSubjects to a comma-separated string if it's an array
    const formattedInterestedSubjects = Array.isArray(interestedSubjects) 
      ? interestedSubjects.join(', ') 
      : interestedSubjects;

    // Update user with onboarding data
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        onboarded: true,
        studyGoal,
        dailyStudyHours,
        interestedSubjects: formattedInterestedSubjects
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