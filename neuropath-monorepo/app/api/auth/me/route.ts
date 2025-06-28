import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database
const users: any[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@neuropath.com",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Test User",
    email: "user@test.com",
    role: "user",
    createdAt: new Date().toISOString(),
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

    const user = users.find((u) => u.id === decoded.userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}
