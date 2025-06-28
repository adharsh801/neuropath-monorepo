"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Brain, Clock, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push("/login")
          return
        }

        const response = await fetch("/api/quiz/questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setQuestions(data.questions)
        } else {
          toast({
            title: "Error",
            description: "Failed to load questions",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [router])

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitting) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft, isSubmitting])

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion]: Number.parseInt(value),
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/results?score=${result.score}&total=${questions.length}`)
      } else {
        toast({
          title: "Error",
          description: "Failed to submit quiz",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>No Questions Available</CardTitle>
            <CardDescription>Please try again later</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">NeuroPath Quiz</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Clock className="h-4 w-4" />
              <span className={timeLeft < 300 ? "text-red-600 font-bold" : ""}>{formatTime(timeLeft)}</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Progress</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">Question {currentQuestion + 1}</CardTitle>
            <CardDescription className="text-lg leading-relaxed">{currentQ.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion]?.toString() || ""}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                Previous
              </Button>

              <div className="flex gap-2">
                {currentQuestion === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || Object.keys(answers).length !== questions.length}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Submit Quiz
                      </>
                    )}
                  </Button>
                ) : (
                  <Button onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
                    Next
                  </Button>
                )}
              </div>
            </div>

            {/* Answer Summary */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium mb-2">Answer Summary</h4>
              <div className="flex flex-wrap gap-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer ${
                      index === currentQuestion
                        ? "bg-blue-600 text-white"
                        : answers[index] !== undefined
                          ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                          : "bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Answered: {Object.keys(answers).length} / {questions.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
