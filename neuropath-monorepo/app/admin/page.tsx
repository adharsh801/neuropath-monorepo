"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Brain, Plus, Edit, Trash2, Users, BookOpen, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  category: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

export default function AdminPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [activeTab, setActiveTab] = useState("questions")
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    category: "",
  })
  const router = useRouter()

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push("/login")
          return
        }

        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const userData = await response.json()
          if (userData.user.role !== "admin") {
            router.push("/dashboard")
            return
          }
        } else {
          router.push("/login")
          return
        }

        // Load data
        await Promise.all([fetchQuestions(), fetchUsers()])
      } catch (error) {
        console.error("Error checking admin access:", error)
        router.push("/login")
      }
    }

    checkAdminAccess()
  }, [router])

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/admin/questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setQuestions(data.questions)
      }
    } catch (error) {
      console.error("Error fetching questions:", error)
    }
  }

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleAddQuestion = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/admin/add-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newQuestion),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Question added successfully",
        })
        setIsAddingQuestion(false)
        setNewQuestion({
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
          category: "",
        })
        fetchQuestions()
      } else {
        toast({
          title: "Error",
          description: "Failed to add question",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  }

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/admin/question/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Question deleted successfully",
        })
        fetchQuestions()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete question",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">NeuroPath Admin</span>
          </div>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{questions.length}</div>
              <p className="text-xs text-muted-foreground">In question bank</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin Tools</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">System status</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <Button variant={activeTab === "questions" ? "default" : "outline"} onClick={() => setActiveTab("questions")}>
            <BookOpen className="h-4 w-4 mr-2" />
            Questions
          </Button>
          <Button variant={activeTab === "users" ? "default" : "outline"} onClick={() => setActiveTab("users")}>
            <Users className="h-4 w-4 mr-2" />
            Users
          </Button>
        </div>

        {/* Questions Tab */}
        {activeTab === "questions" && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Question Management</CardTitle>
                  <CardDescription>Add, edit, and delete quiz questions</CardDescription>
                </div>
                <Dialog open={isAddingQuestion} onOpenChange={setIsAddingQuestion}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Question</DialogTitle>
                      <DialogDescription>Create a new quiz question with multiple choice answers</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="question">Question</Label>
                        <Textarea
                          id="question"
                          placeholder="Enter the question..."
                          value={newQuestion.question}
                          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Answer Options</Label>
                        {newQuestion.options.map((option, index) => (
                          <div key={index} className="flex gap-2 mt-2">
                            <Input
                              placeholder={`Option ${index + 1}`}
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...newQuestion.options]
                                newOptions[index] = e.target.value
                                setNewQuestion({ ...newQuestion, options: newOptions })
                              }}
                            />
                            <Button
                              type="button"
                              variant={newQuestion.correctAnswer === index ? "default" : "outline"}
                              onClick={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                            >
                              Correct
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          placeholder="e.g., Neuroanatomy, Physiology"
                          value={newQuestion.category}
                          onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddingQuestion(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddQuestion}>Add Question</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="max-w-md">
                        <div className="truncate">{question.question}</div>
                      </TableCell>
                      <TableCell>{question.category}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingQuestion(question)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteQuestion(question.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
