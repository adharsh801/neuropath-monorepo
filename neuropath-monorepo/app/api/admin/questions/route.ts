import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock questions database
const questions = [
  {
    id: "1",
    question: "Which part of the brain is primarily responsible for balance and coordination?",
    options: ["Cerebrum", "Cerebellum", "Brainstem", "Thalamus"],
    correctAnswer: 1,
    category: "Neuroanatomy",
  },
  {
    id: "2",
    question: "What is the main neurotransmitter involved in muscle contraction?",
    options: ["Dopamine", "Serotonin", "Acetylcholine", "GABA"],
    correctAnswer: 2,
    category: "Neurotransmitters",
  },
  {
    id: "3",
    question: "Which lobe of the brain is primarily associated with vision?",
    options: ["Frontal lobe", "Parietal lobe", "Temporal lobe", "Occipital lobe"],
    correctAnswer: 3,
    category: "Neuroanatomy",
  },
  {
    id: "4",
    question: "What is the resting potential of a typical neuron?",
    options: ["-70mV", "-90mV", "+30mV", "0mV"],
    correctAnswer: 0,
    category: "Neurophysiology",
  },
  {
    id: "5",
    question: "Which structure connects the two hemispheres of the brain?",
    options: ["Corpus callosum", "Hippocampus", "Amygdala", "Hypothalamus"],
    correctAnswer: 0,
    category: "Neuroanatomy",
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
      questions,
    })
  } catch (error) {
    console.error("Admin questions error:", error)
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}
