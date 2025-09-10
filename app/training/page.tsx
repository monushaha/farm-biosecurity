"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { BookOpen, ArrowLeft, Play, CheckCircle, Clock, Search, Award, Users } from "lucide-react"
import Link from "next/link"

interface TrainingModule {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: string
  progress: number
  completed: boolean
  thumbnail: string
}

const trainingModules: TrainingModule[] = [
  {
    id: "1",
    title: "Introduction to Farm Biosecurity",
    description:
      "Learn the fundamental principles of biosecurity and why it's critical for livestock health and farm productivity.",
    duration: "45 min",
    difficulty: "Beginner",
    category: "Fundamentals",
    progress: 100,
    completed: true,
    thumbnail: "/farm-biosecurity-basics.jpg",
  },
  {
    id: "2",
    title: "Visitor Access Control Protocols",
    description:
      "Comprehensive guide to managing visitor access, including registration, disinfection, and protective equipment requirements.",
    duration: "30 min",
    difficulty: "Beginner",
    category: "Access Control",
    progress: 75,
    completed: false,
    thumbnail: "/visitor-access-control-farm.jpg",
  },
  {
    id: "3",
    title: "Vehicle Disinfection Procedures",
    description: "Step-by-step protocols for proper vehicle cleaning and disinfection to prevent disease transmission.",
    duration: "25 min",
    difficulty: "Intermediate",
    category: "Vehicle Management",
    progress: 0,
    completed: false,
    thumbnail: "/vehicle-disinfection-farm.jpg",
  },
  {
    id: "4",
    title: "Disease Recognition in Pigs",
    description: "Learn to identify early signs of common pig diseases and when to contact veterinary professionals.",
    duration: "60 min",
    difficulty: "Intermediate",
    category: "Animal Health",
    progress: 0,
    completed: false,
    thumbnail: "/pig-disease-recognition.jpg",
  },
  {
    id: "5",
    title: "Poultry Health Monitoring",
    description:
      "Daily health checks, behavioral indicators, and record-keeping for optimal poultry health management.",
    duration: "50 min",
    difficulty: "Intermediate",
    category: "Animal Health",
    progress: 0,
    completed: false,
    thumbnail: "/poultry-health-monitoring.jpg",
  },
  {
    id: "6",
    title: "Feed Safety and Storage",
    description: "Best practices for feed delivery, storage, and contamination prevention to maintain animal health.",
    duration: "35 min",
    difficulty: "Beginner",
    category: "Feed Management",
    progress: 0,
    completed: false,
    thumbnail: "/feed-safety-storage-farm.jpg",
  },
  {
    id: "7",
    title: "Waste Management and Disposal",
    description: "Proper handling and disposal of animal waste, dead animals, and contaminated materials.",
    duration: "40 min",
    difficulty: "Advanced",
    category: "Waste Management",
    progress: 0,
    completed: false,
    thumbnail: "/farm-waste-management.jpg",
  },
  {
    id: "8",
    title: "Emergency Response Protocols",
    description: "Rapid response procedures for disease outbreaks, natural disasters, and biosecurity breaches.",
    duration: "55 min",
    difficulty: "Advanced",
    category: "Emergency Management",
    progress: 0,
    completed: false,
    thumbnail: "/farm-emergency-response.jpg",
  },
]

const categories = [
  "All",
  "Fundamentals",
  "Access Control",
  "Vehicle Management",
  "Animal Health",
  "Feed Management",
  "Waste Management",
  "Emergency Management",
]
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

export default function TrainingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const filteredModules = trainingModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || module.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || module.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const completedModules = trainingModules.filter((m) => m.completed).length
  const totalProgress = Math.round((completedModules / trainingModules.length) * 100)

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
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Training Modules</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalProgress}%</div>
              <Progress value={totalProgress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {completedModules} of {trainingModules.length} modules completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.5</div>
              <p className="text-xs text-muted-foreground">Total hours completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Certificates earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search training modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <Card key={module.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img
                  src={module.thumbnail || "/placeholder.svg"}
                  alt={module.title}
                  className="w-full h-full object-cover"
                />
                {module.completed && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}
                {module.progress > 0 && !module.completed && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                    <Progress value={module.progress} className="h-1" />
                    <p className="text-xs mt-1">{module.progress}% complete</p>
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">{module.title}</CardTitle>
                  <Badge className={getDifficultyColor(module.difficulty)} variant="secondary">
                    {module.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {module.duration}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {module.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="mb-4 text-balance">{module.description}</CardDescription>

                <Link href={`/training/${module.id}`}>
                  <Button className="w-full" variant={module.completed ? "outline" : "default"}>
                    {module.completed ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Review Module
                      </>
                    ) : module.progress > 0 ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Module
                      </>
                    )}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No modules found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find relevant training content.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
