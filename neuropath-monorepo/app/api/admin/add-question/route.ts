import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any

    // Check if user is admin
    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Access denied" }, { status: 403 })
    }

    const { question, options, correctAnswer, category } = await request.json()

    // Validate input
    if (!question || !options || options.length !== 4 || correctAnswer === undefined || !category) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // In a real app, save to database
    const newQuestion = {
      id: Date.now().toString(),
      question,
      options,
      correctAnswer,
      category,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      message: "Question added successfully",
      question: newQuestion,
    })
  } catch (error) {
    console.error("Add question error:", error)
    return NextResponse.json({ message: "Invalid token or server error" }, { status: 401 })
  }
}
