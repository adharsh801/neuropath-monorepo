import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock questions database (same as in questions route)
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

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any

    const { answers } = await request.json()

    // Calculate score
    let correctAnswers = 0
    const totalQuestions = Object.keys(answers).length

    Object.entries(answers).forEach(([questionIndex, userAnswer]) => {
      const questionId = (Number.parseInt(questionIndex) + 1).toString()
      const question = questions.find((q) => q.id === questionId)
      if (question && question.correctAnswer === userAnswer) {
        correctAnswers++
      }
    })

    const score = correctAnswers
    const percentage = Math.round((correctAnswers / totalQuestions) * 100)

    // In a real app, save the result to database
    const result = {
      id: Date.now().toString(),
      userId: decoded.userId,
      score,
      totalQuestions,
      percentage,
      answers,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({
      message: "Quiz submitted successfully",
      score,
      totalQuestions,
      percentage,
      result,
    })
  } catch (error) {
    console.error("Submit error:", error)
    return NextResponse.json({ message: "Invalid token or submission error" }, { status: 401 })
  }
}
