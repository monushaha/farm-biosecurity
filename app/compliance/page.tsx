"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { CheckCircle, ArrowLeft, AlertTriangle, Clock, FileText, CalendarIcon, Download, Plus, Eye } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface ComplianceItem {
  id: string
  title: string
  category: string
  status: "compliant" | "overdue" | "due-soon" | "pending"
  dueDate: Date
  lastCompleted?: Date
  frequency: string
  description: string
  documents: string[]
}

const complianceItems: ComplianceItem[] = [
  {
    id: "1",
    title: "Visitor Log Maintenance",
    category: "Access Control",
    status: "compliant",
    dueDate: new Date(2024, 11, 15),
    lastCompleted: new Date(2024, 11, 10),
    frequency: "Daily",
    description: "Maintain accurate visitor logs with entry/exit times, purpose of visit, and biosecurity compliance.",
    documents: ["visitor-log-template.pdf", "biosecurity-checklist.pdf"],
  },
  {
    id: "2",
    title: "Vehicle Disinfection Records",
    category: "Vehicle Management",
    status: "due-soon",
    dueDate: new Date(2024, 11, 12),
    lastCompleted: new Date(2024, 11, 5),
    frequency: "Weekly",
    description: "Document all vehicle disinfection procedures including chemicals used and verification.",
    documents: ["disinfection-log.pdf"],
  },
  {
    id: "3",
    title: "Animal Health Monitoring",
    category: "Animal Health",
    status: "overdue",
    dueDate: new Date(2024, 11, 8),
    lastCompleted: new Date(2024, 10, 25),
    frequency: "Daily",
    description: "Daily health checks and mortality records for all livestock buildings.",
    documents: ["health-monitoring-form.pdf", "mortality-log.pdf"],
  },
  {
    id: "4",
    title: "Feed Safety Documentation",
    category: "Feed Management",
    status: "compliant",
    dueDate: new Date(2024, 11, 20),
    lastCompleted: new Date(2024, 11, 8),
    frequency: "Per Delivery",
    description: "Maintain feed delivery receipts, quality certificates, and storage temperature logs.",
    documents: ["feed-delivery-log.pdf", "temperature-log.pdf"],
  },
  {
    id: "5",
    title: "Waste Disposal Records",
    category: "Waste Management",
    status: "pending",
    dueDate: new Date(2024, 11, 18),
    frequency: "Monthly",
    description: "Document proper disposal of dead animals, contaminated materials, and waste management.",
    documents: ["waste-disposal-form.pdf"],
  },
  {
    id: "6",
    title: "Staff Training Certificates",
    category: "Training",
    status: "due-soon",
    dueDate: new Date(2024, 11, 14),
    lastCompleted: new Date(2024, 8, 15),
    frequency: "Quarterly",
    description: "Ensure all staff complete required biosecurity training and maintain current certificates.",
    documents: ["training-certificate.pdf", "training-log.pdf"],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "compliant":
      return "bg-green-100 text-green-800"
    case "due-soon":
      return "bg-yellow-100 text-yellow-800"
    case "overdue":
      return "bg-red-100 text-red-800"
    case "pending":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "compliant":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "due-soon":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "overdue":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    case "pending":
      return <Clock className="h-4 w-4 text-blue-600" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export default function CompliancePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const compliantItems = complianceItems.filter((item) => item.status === "compliant").length
  const overdueItems = complianceItems.filter((item) => item.status === "overdue").length
  const dueSoonItems = complianceItems.filter((item) => item.status === "due-soon").length
  const complianceRate = Math.round((compliantItems / complianceItems.length) * 100)

  const upcomingTasks = complianceItems
    .filter((item) => item.status === "due-soon" || item.status === "overdue")
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())

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
            <CheckCircle className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Compliance Tracking</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Compliance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{complianceRate}%</div>
              <Progress value={complianceRate} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {compliantItems} of {complianceItems.length} items compliant
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Items</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{overdueItems}</div>
              <p className="text-xs text-muted-foreground">Require immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{dueSoonItems}</div>
              <p className="text-xs text-muted-foreground">Due within 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliant</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{compliantItems}</div>
              <p className="text-xs text-muted-foreground">Up to date</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Compliance Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Compliance Items</h2>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                {complianceItems.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(item.status)}
                            <CardTitle className="text-base">{item.title}</CardTitle>
                            <Badge className={getStatusColor(item.status)} variant="secondary">
                              {item.status.replace("-", " ")}
                            </Badge>
                          </div>
                          <CardDescription>{item.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Category:</span>
                          <p className="font-medium">{item.category}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Frequency:</span>
                          <p className="font-medium">{item.frequency}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Due Date:</span>
                          <p className="font-medium">{format(item.dueDate, "MMM dd, yyyy")}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Completed:</span>
                          <p className="font-medium">
                            {item.lastCompleted ? format(item.lastCompleted, "MMM dd, yyyy") : "Never"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{item.documents.length} document(s)</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm">Mark Complete</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Upcoming Tasks */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Tasks</CardTitle>
                    <CardDescription>Items requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingTasks.slice(0, 5).map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        {getStatusIcon(item.status)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.title}</p>
                          <p className="text-xs text-muted-foreground">Due {format(item.dueDate, "MMM dd")}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export Compliance Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Audit Trail
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Schedule Inspection
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Calendar</CardTitle>
                  <CardDescription>View upcoming compliance deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{selectedDate ? format(selectedDate, "MMMM dd, yyyy") : "Select a date"}</CardTitle>
                  <CardDescription>Compliance items for selected date</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDate && (
                    <div className="space-y-3">
                      {complianceItems
                        .filter((item) => format(item.dueDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"))
                        .map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            {getStatusIcon(item.status)}
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.category}</p>
                            </div>
                          </div>
                        ))}
                      {complianceItems.filter(
                        (item) => format(item.dueDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"),
                      ).length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No compliance items due on this date
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Library</CardTitle>
                <CardDescription>Access compliance forms, templates, and records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Visitor Log Template",
                    "Vehicle Disinfection Log",
                    "Health Monitoring Form",
                    "Feed Delivery Log",
                    "Waste Disposal Form",
                    "Training Certificate Template",
                    "Biosecurity Checklist",
                    "Emergency Response Plan",
                  ].map((doc, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{doc}</p>
                            <p className="text-xs text-muted-foreground">PDF Document</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Reports</CardTitle>
                  <CardDescription>Generate detailed compliance reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Monthly Compliance Summary
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Audit Trail Report
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Overdue Items Report
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Training Compliance Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Trends</CardTitle>
                  <CardDescription>Track compliance performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Month</span>
                      <span className="font-medium">{complianceRate}%</span>
                    </div>
                    <Progress value={complianceRate} />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Month</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <Progress value={91} />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">3 Months Ago</span>
                      <span className="font-medium">88%</span>
                    </div>
                    <Progress value={88} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
