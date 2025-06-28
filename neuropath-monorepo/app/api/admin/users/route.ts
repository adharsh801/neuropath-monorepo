import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock users database
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@neuropath.com",
    role: "admin",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Test User",
    email: "user@test.com",
    role: "user",
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    createdAt: "2024-01-03T00:00:00.000Z",
  },
  {
    id: "4",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    createdAt: "2024-01-04T00:00:00.000Z",
  },
]

export async function GET(request: NextRequest) {
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

    return NextResponse.json({
      users,
    })
  } catch (error) {
    console.error("Admin users error:", error)
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}
