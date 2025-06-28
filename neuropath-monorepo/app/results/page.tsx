"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Trophy, Target, RotateCcw, Home, Share2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [grade, setGrade] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const scoreParam = searchParams.get("score")
    const totalParam = searchParams.get("total")

    if (scoreParam && totalParam) {
      const scoreNum = Number.parseInt(scoreParam)
      const totalNum = Number.parseInt(totalParam)
      const percentageNum = Math.round((scoreNum / totalNum) * 100)

      setScore(scoreNum)
      setTotal(totalNum)
      setPercentage(percentageNum)

      // Determine grade and message
      if (percentageNum >= 90) {
        setGrade("A+")
        setMessage("Outstanding! You have excellent knowledge of neuroscience.")
      } else if (percentageNum >= 80) {
        setGrade("A")
        setMessage("Great job! You have a strong understanding of the material.")
      } else if (percentageNum >= 70) {
        setGrade("B")
        setMessage("Good work! Keep studying to improve your knowledge.")
      } else if (percentageNum >= 60) {
        setGrade("C")
        setMessage("Fair performance. Consider reviewing the material again.")
      } else {
        setGrade("F")
        setMessage("Keep practicing! Review the concepts and try again.")
      }
    }
  }, [searchParams])

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
      case "A":
        return "text-green-600"
      case "B":
        return "text-blue-600"
      case "C":
        return "text-yellow-600"
      default:
        return "text-red-600"
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 60) return "bg-blue-500"
    if (percentage >= 40) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">NeuroPath</span>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Quiz Complete!</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Here are your results</p>
            </div>
          </div>

          {/* Score Card */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Your Score</CardTitle>
              <CardDescription>Performance breakdown</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {score}/{total}
                </div>
                <div className={`text-4xl font-bold ${getGradeColor(grade)} mb-4`}>
                  {percentage}% - Grade {grade}
                </div>
                <Progress value={percentage} className="h-4 mb-4" />
                <p className="text-lg text-gray-600 dark:text-gray-300">{message}</p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Correct Answers</CardTitle>
                <Target className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <p className="text-xs text-muted-foreground">out of {total} questions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                <Trophy className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{percentage}%</div>
                <p className="text-xs text-muted-foreground">Overall performance</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Grade</CardTitle>
                <Brain className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getGradeColor(grade)}`}>{grade}</div>
                <p className="text-xs text-muted-foreground">Letter grade</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Analysis */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>Areas for improvement and strengths</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {percentage >= 80 ? (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Strengths</h4>
                    <p className="text-green-700 dark:text-green-300">
                      Excellent understanding of neuroscience concepts. You demonstrate strong knowledge across multiple
                      areas.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Areas for Improvement</h4>
                    <p className="text-blue-700 dark:text-blue-300">
                      Consider reviewing fundamental concepts and practicing more questions to strengthen your
                      understanding.
                    </p>
                  </div>
                )}

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                  <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Recommendations</h4>
                  <ul className="text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• Review neuroanatomy diagrams and structures</li>
                    <li>• Practice more questions on synaptic transmission</li>
                    <li>• Study neurotransmitter functions and pathways</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz">
              <Button size="lg" className="w-full sm:w-auto">
                <RotateCcw className="h-4 w-4 mr-2" />
                Take Another Quiz
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                <Home className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Share Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
