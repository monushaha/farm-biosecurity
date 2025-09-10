"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, ArrowLeft, CheckCircle, BarChart3 } from "lucide-react"
import Link from "next/link"

interface Question {
  id: string
  category: string
  question: string
  options: { value: string; label: string; score: number }[]
}

const assessmentQuestions: Question[] = [
  {
    id: "1",
    category: "Access Control",
    question: "How is visitor access to your farm controlled?",
    options: [
      { value: "no-control", label: "No specific controls in place", score: 0 },
      { value: "basic-log", label: "Basic visitor log book", score: 2 },
      { value: "controlled-entry", label: "Controlled entry with disinfection", score: 4 },
      { value: "full-protocol", label: "Full biosecurity protocol with shower-in", score: 5 },
    ],
  },
  {
    id: "2",
    category: "Vehicle Management",
    question: "What vehicle disinfection procedures do you have?",
    options: [
      { value: "none", label: "No vehicle disinfection", score: 0 },
      { value: "basic-wash", label: "Basic washing when visibly dirty", score: 1 },
      { value: "regular-disinfection", label: "Regular disinfection at entry", score: 3 },
      { value: "comprehensive", label: "Comprehensive wash and disinfection protocol", score: 5 },
    ],
  },
  {
    id: "3",
    category: "Feed Security",
    question: "How do you manage feed delivery and storage?",
    options: [
      { value: "open-access", label: "Open access, no specific controls", score: 0 },
      { value: "designated-area", label: "Designated delivery area", score: 2 },
      { value: "controlled-delivery", label: "Controlled delivery with disinfection", score: 4 },
      { value: "sealed-system", label: "Sealed delivery system with biosecurity protocols", score: 5 },
    ],
  },
  {
    id: "4",
    category: "Animal Health",
    question: "How frequently do you monitor animal health?",
    options: [
      { value: "reactive", label: "Only when problems are visible", score: 1 },
      { value: "weekly", label: "Weekly health checks", score: 3 },
      { value: "daily", label: "Daily health monitoring", score: 4 },
      { value: "systematic", label: "Systematic daily monitoring with records", score: 5 },
    ],
  },
  {
    id: "5",
    category: "Waste Management",
    question: "How do you handle dead animal disposal?",
    options: [
      { value: "basic", label: "Basic burial on property", score: 1 },
      { value: "designated-area", label: "Designated disposal area", score: 2 },
      { value: "approved-method", label: "Approved disposal method (rendering/composting)", score: 4 },
      { value: "comprehensive", label: "Comprehensive biosecure disposal protocol", score: 5 },
    ],
  },
]

export default function RiskAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [riskScore, setRiskScore] = useState(0)

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNote = (questionId: string, note: string) => {
    setNotes((prev) => ({ ...prev, [questionId]: note }))
  }

  const calculateRiskScore = () => {
    let totalScore = 0
    let maxScore = 0

    assessmentQuestions.forEach((question) => {
      const answer = answers[question.id]
      if (answer) {
        const option = question.options.find((opt) => opt.value === answer)
        if (option) {
          totalScore += option.score
        }
      }
      maxScore += Math.max(...question.options.map((opt) => opt.score))
    })

    return Math.round((totalScore / maxScore) * 100)
  }

  const nextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const score = calculateRiskScore()
      setRiskScore(score)
      setIsComplete(true)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getRiskLevel = (score: number) => {
    if (score >= 80)
      return { level: "Low Risk", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" }
    if (score >= 60)
      return { level: "Medium Risk", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" }
    return { level: "High Risk", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
  }

  const getRecommendations = (score: number) => {
    if (score >= 80) {
      return [
        "Maintain current excellent biosecurity practices",
        "Consider advanced monitoring technologies",
        "Regular staff training updates",
        "Periodic third-party audits",
      ]
    }
    if (score >= 60) {
      return [
        "Strengthen visitor access controls",
        "Improve vehicle disinfection procedures",
        "Enhance animal health monitoring frequency",
        "Develop comprehensive waste management protocols",
      ]
    }
    return [
      "Immediate implementation of basic biosecurity measures required",
      "Establish controlled access points with disinfection",
      "Implement daily animal health monitoring",
      "Develop emergency response protocols",
      "Consider professional biosecurity consultation",
    ]
  }

  if (isComplete) {
    const risk = getRiskLevel(riskScore)
    const recommendations = getRecommendations(riskScore)

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Risk Assessment Results</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Results Overview */}
            <Card className={`${risk.bg} ${risk.border}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  Assessment Complete
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-primary">{riskScore}%</div>
                  <Badge className={`${risk.color} text-lg px-4 py-2`} variant="outline">
                    {risk.level}
                  </Badge>
                  <Progress value={riskScore} className="w-full max-w-md mx-auto" />
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Recommendations
                </CardTitle>
                <CardDescription>
                  Based on your assessment, here are priority actions to improve your biosecurity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Your performance across different biosecurity areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessmentQuestions.map((question) => {
                    const answer = answers[question.id]
                    const option = question.options.find((opt) => opt.value === answer)
                    const maxScore = Math.max(...question.options.map((opt) => opt.score))
                    const percentage = option ? (option.score / maxScore) * 100 : 0

                    return (
                      <div key={question.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{question.category}</span>
                          <span className="text-sm text-muted-foreground">
                            {option?.score || 0}/{maxScore}
                          </span>
                        </div>
                        <Progress value={percentage} />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button onClick={() => window.print()} variant="outline">
                Print Report
              </Button>
              <Button
                onClick={() => {
                  setCurrentQuestion(0)
                  setAnswers({})
                  setNotes({})
                  setIsComplete(false)
                  setRiskScore(0)
                }}
              >
                Retake Assessment
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const question = assessmentQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Biosecurity Risk Assessment</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {currentQuestion + 1} of {assessmentQuestions.length}
                </span>
              </div>
              <Progress value={progress} />
            </CardContent>
          </Card>

          {/* Question */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{question.category}</Badge>
              </div>
              <CardTitle className="text-balance">{question.question}</CardTitle>
              <CardDescription>Select the option that best describes your current practices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(value) => handleAnswer(question.id, value)}
              >
                {question.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                    <Badge variant="secondary" className="text-xs">
                      {option.score}/5
                    </Badge>
                  </div>
                ))}
              </RadioGroup>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any specific details about your current practices..."
                  value={notes[question.id] || ""}
                  onChange={(e) => handleNote(question.id, e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                  Previous
                </Button>
                <Button onClick={nextQuestion} disabled={!answers[question.id]}>
                  {currentQuestion === assessmentQuestions.length - 1 ? "Complete Assessment" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
