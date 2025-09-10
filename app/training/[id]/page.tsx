"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { BookOpen, ArrowLeft, Play, Pause, CheckCircle, Clock, Award, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
  type: "video" | "reading" | "quiz"
}

interface ModuleData {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: string
  objectives: string[]
  lessons: Lesson[]
  certificate: boolean
}

// Mock data for the training module
const moduleData: ModuleData = {
  id: "2",
  title: "Visitor Access Control Protocols",
  description:
    "Comprehensive guide to managing visitor access, including registration, disinfection, and protective equipment requirements.",
  duration: "30 min",
  difficulty: "Beginner",
  category: "Access Control",
  objectives: [
    "Understand the importance of visitor access control in biosecurity",
    "Learn proper visitor registration procedures",
    "Master disinfection protocols for visitors and equipment",
    "Implement protective equipment requirements",
    "Develop visitor education and communication strategies",
  ],
  lessons: [
    { id: "1", title: "Introduction to Visitor Control", duration: "5 min", completed: true, type: "video" },
    { id: "2", title: "Registration and Documentation", duration: "8 min", completed: true, type: "video" },
    { id: "3", title: "Disinfection Procedures", duration: "10 min", completed: true, type: "video" },
    { id: "4", title: "Protective Equipment Guidelines", duration: "5 min", completed: false, type: "reading" },
    { id: "5", title: "Knowledge Check", duration: "2 min", completed: false, type: "quiz" },
  ],
  certificate: true,
}

export default function TrainingModulePage({ params }: { params: { id: string } }) {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const completedLessons = moduleData.lessons.filter((lesson) => lesson.completed).length
  const progress = Math.round((completedLessons / moduleData.lessons.length) * 100)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "reading":
        return <BookOpen className="h-4 w-4" />
      case "quiz":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Play className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/training">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Training
              </Button>
            </Link>
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">{moduleData.title}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Module Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{moduleData.title}</CardTitle>
                    <CardDescription className="text-base mb-4">{moduleData.description}</CardDescription>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {moduleData.duration}
                      </span>
                      <Badge className={getDifficultyColor(moduleData.difficulty)} variant="secondary">
                        {moduleData.difficulty}
                      </Badge>
                      <Badge variant="outline">{moduleData.category}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{progress}%</div>
                    <Progress value={progress} className="w-24 mt-1" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Video Player / Content Area */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-black rounded-t-lg relative flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                    </div>
                    <h3 className="text-lg font-medium mb-2">{moduleData.lessons[currentLesson]?.title}</h3>
                    <Button onClick={() => setIsPlaying(!isPlaying)} variant="secondary">
                      {isPlaying ? "Pause" : "Play"} Lesson
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">
                      Lesson {currentLesson + 1}: {moduleData.lessons[currentLesson]?.title}
                    </h4>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentLesson === 0}
                        onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                      >
                        Previous
                      </Button>
                      <Button
                        size="sm"
                        disabled={currentLesson === moduleData.lessons.length - 1}
                        onClick={() => setCurrentLesson(Math.min(moduleData.lessons.length - 1, currentLesson + 1))}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Objectives</CardTitle>
                <CardDescription>By the end of this module, you will be able to:</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {moduleData.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Content</CardTitle>
                <CardDescription>
                  {completedLessons} of {moduleData.lessons.length} lessons completed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {moduleData.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      index === currentLesson ? "bg-primary/10 border-primary" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setCurrentLesson(index)}
                  >
                    <div className={`flex-shrink-0 ${lesson.completed ? "text-green-600" : "text-muted-foreground"}`}>
                      {lesson.completed ? <CheckCircle className="h-4 w-4" /> : getLessonIcon(lesson.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{lesson.title}</p>
                      <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certificate */}
            {moduleData.certificate && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Certificate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete all lessons to earn your certificate of completion.
                  </p>
                  <Button
                    className="w-full"
                    disabled={progress < 100}
                    variant={progress === 100 ? "default" : "outline"}
                  >
                    {progress === 100 ? "Download Certificate" : `${progress}% Complete`}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Progress Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Completion</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} />
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm">Time Spent</span>
                  <span className="font-medium">23 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lessons Left</span>
                  <span className="font-medium">{moduleData.lessons.length - completedLessons}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
