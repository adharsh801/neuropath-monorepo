import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params

    // In a real app, delete from database
    // For demo purposes, we'll just return success

    return NextResponse.json({
      message: "Question deleted successfully",
    })
  } catch (error) {
    console.error("Delete question error:", error)
    return NextResponse.json({ message: "Invalid token or server error" }, { status: 401 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params
    const { question, options, correctAnswer, category } = await request.json()

    // In a real app, update in database
    const updatedQuestion = {
      id,
      question,
      options,
      correctAnswer,
      category,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      message: "Question updated successfully",
      question: updatedQuestion,
    })
  } catch (error) {
    console.error("Update question error:", error)
    return NextResponse.json({ message: "Invalid token or server error" }, { status: 401 })
  }
}
