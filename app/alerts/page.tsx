"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, ArrowLeft, AlertTriangle, CheckCircle, Clock, Search, MapPin, Shield } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface Alert {
  id: string
  title: string
  description: string
  type: "critical" | "warning" | "info" | "success"
  category: string
  location?: string
  timestamp: Date
  acknowledged: boolean
  resolved: boolean
  source: string
}

const alerts: Alert[] = [
  {
    id: "1",
    title: "Visitor log incomplete",
    description: "Entry recorded without exit time for visitor John Smith. Potential biosecurity breach.",
    type: "critical",
    category: "Access Control",
    location: "Poultry House A",
    timestamp: new Date(2024, 11, 10, 14, 30),
    acknowledged: false,
    resolved: false,
    source: "Access Control System",
  },
  {
    id: "2",
    title: "Equipment sanitization overdue",
    description: "Weekly equipment sanitization is 2 days overdue in Pig Barn B.",
    type: "warning",
    category: "Maintenance",
    location: "Pig Barn B",
    timestamp: new Date(2024, 11, 10, 10, 15),
    acknowledged: true,
    resolved: false,
    source: "Maintenance Schedule",
  },
  {
    id: "3",
    title: "Disease outbreak reported nearby",
    description: "Avian influenza reported at farm 5km northeast. Heightened biosecurity measures recommended.",
    type: "critical",
    category: "Disease Alert",
    timestamp: new Date(2024, 11, 10, 8, 45),
    acknowledged: true,
    resolved: false,
    source: "Regional Disease Surveillance",
  },
  {
    id: "4",
    title: "Training module completed",
    description: "Staff member Sarah Johnson completed 'Vehicle Disinfection Procedures' training.",
    type: "success",
    category: "Training",
    timestamp: new Date(2024, 11, 10, 16, 20),
    acknowledged: true,
    resolved: true,
    source: "Training System",
  },
  {
    id: "5",
    title: "Weather alert: Heavy rain expected",
    description: "Heavy rainfall predicted for next 48 hours. Review drainage and ventilation protocols.",
    type: "info",
    category: "Weather",
    timestamp: new Date(2024, 11, 9, 18, 0),
    acknowledged: true,
    resolved: false,
    source: "Weather Service",
  },
  {
    id: "6",
    title: "Feed delivery scheduled",
    description: "Feed delivery from ABC Feeds scheduled for tomorrow 9:00 AM. Ensure disinfection protocols ready.",
    type: "info",
    category: "Feed Management",
    timestamp: new Date(2024, 11, 9, 15, 30),
    acknowledged: true,
    resolved: false,
    source: "Feed Management System",
  },
  {
    id: "7",
    title: "Mortality rate spike detected",
    description:
      "Mortality rate in Poultry House C increased by 15% over past 3 days. Veterinary consultation recommended.",
    type: "warning",
    category: "Animal Health",
    location: "Poultry House C",
    timestamp: new Date(2024, 11, 9, 12, 10),
    acknowledged: false,
    resolved: false,
    source: "Health Monitoring System",
  },
  {
    id: "8",
    title: "Compliance audit scheduled",
    description: "Regulatory compliance audit scheduled for December 15th. Ensure all documentation is current.",
    type: "info",
    category: "Compliance",
    timestamp: new Date(2024, 11, 8, 14, 0),
    acknowledged: true,
    resolved: false,
    source: "Compliance System",
  },
]

const getAlertColor = (type: string) => {
  switch (type) {
    case "critical":
      return "bg-red-100 text-red-800 border-red-200"
    case "warning":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "info":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "success":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case "critical":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    case "warning":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "info":
      return <Bell className="h-4 w-4 text-blue-600" />
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [showResolved, setShowResolved] = useState(false)

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || alert.type === selectedType
    const matchesResolved = showResolved || !alert.resolved

    return matchesSearch && matchesType && matchesResolved
  })

  const criticalAlerts = alerts.filter((a) => a.type === "critical" && !a.resolved).length
  const warningAlerts = alerts.filter((a) => a.type === "warning" && !a.resolved).length
  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged && !a.resolved).length

  const handleAcknowledge = (alertId: string) => {
    // In a real app, this would update the backend
    console.log(`Acknowledged alert ${alertId}`)
  }

  const handleResolve = (alertId: string) => {
    // In a real app, this would update the backend
    console.log(`Resolved alert ${alertId}`)
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
            <Bell className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Alert Center</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{criticalAlerts}</div>
              <p className="text-xs text-muted-foreground">Require immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warning Alerts</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{warningAlerts}</div>
              <p className="text-xs text-muted-foreground">Need attention soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unacknowledged</CardTitle>
              <Bell className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{unacknowledgedAlerts}</div>
              <p className="text-xs text-muted-foreground">Awaiting acknowledgment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Active</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{alerts.filter((a) => !a.resolved).length}</div>
              <p className="text-xs text-muted-foreground">Active alerts</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="alerts">All Alerts</TabsTrigger>
            <TabsTrigger value="settings">Alert Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="all">All Types</option>
                      <option value="critical">Critical</option>
                      <option value="warning">Warning</option>
                      <option value="info">Info</option>
                      <option value="success">Success</option>
                    </select>

                    <div className="flex items-center space-x-2">
                      <Switch id="show-resolved" checked={showResolved} onCheckedChange={setShowResolved} />
                      <Label htmlFor="show-resolved" className="text-sm">
                        Show resolved
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts List */}
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`${getAlertColor(alert.type)} ${!alert.acknowledged ? "ring-2 ring-offset-2" : ""}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-base">{alert.title}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {alert.category}
                            </Badge>
                            {alert.location && (
                              <Badge variant="outline" className="text-xs">
                                <MapPin className="h-3 w-3 mr-1" />
                                {alert.location}
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-sm">{alert.description}</CardDescription>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{format(alert.timestamp, "MMM dd, yyyy 'at' HH:mm")}</span>
                            <span>Source: {alert.source}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        {alert.acknowledged && (
                          <Badge variant="outline" className="text-xs">
                            Acknowledged
                          </Badge>
                        )}
                        {alert.resolved && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                            Resolved
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {!alert.resolved && (
                    <CardContent className="pt-0">
                      <div className="flex gap-2">
                        {!alert.acknowledged && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAcknowledge(alert.id)}
                            className="bg-transparent"
                          >
                            Acknowledge
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => handleResolve(alert.id)}
                          variant={alert.acknowledged ? "default" : "outline"}
                          className={!alert.acknowledged ? "bg-transparent" : ""}
                        >
                          Mark Resolved
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}

              {filteredAlerts.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No alerts found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || selectedType !== "all" || !showResolved
                        ? "Try adjusting your filters to see more alerts."
                        : "All clear! No active alerts at this time."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure how you receive alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Email Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive alerts via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">SMS Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive critical alerts via SMS</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Push Notifications</Label>
                      <p className="text-xs text-muted-foreground">Browser push notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Daily Summary</Label>
                      <p className="text-xs text-muted-foreground">Daily alert summary email</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Categories</CardTitle>
                  <CardDescription>Enable/disable specific alert types</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Access Control", description: "Visitor and entry alerts" },
                    { name: "Animal Health", description: "Health monitoring alerts" },
                    { name: "Disease Alert", description: "Regional disease notifications" },
                    { name: "Maintenance", description: "Equipment and facility alerts" },
                    { name: "Training", description: "Training completion notifications" },
                    { name: "Weather", description: "Weather-related alerts" },
                    { name: "Compliance", description: "Regulatory compliance alerts" },
                    { name: "Feed Management", description: "Feed delivery and storage alerts" },
                  ].map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">{category.name}</Label>
                        <p className="text-xs text-muted-foreground">{category.description}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Thresholds</CardTitle>
                  <CardDescription>Configure when alerts are triggered</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Mortality Rate Threshold (%)</Label>
                    <Input type="number" defaultValue="10" className="w-full" />
                    <p className="text-xs text-muted-foreground">Alert when mortality rate exceeds this percentage</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Overdue Task Alert (days)</Label>
                    <Input type="number" defaultValue="1" className="w-full" />
                    <p className="text-xs text-muted-foreground">Alert when tasks are overdue by this many days</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Disease Proximity Alert (km)</Label>
                    <Input type="number" defaultValue="10" className="w-full" />
                    <p className="text-xs text-muted-foreground">Alert when disease reported within this distance</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Update your contact details for alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Email Address</Label>
                    <Input type="email" defaultValue="farmer@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Phone Number</Label>
                    <Input type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Emergency Contact</Label>
                    <Input type="tel" defaultValue="+1 (555) 987-6543" />
                  </div>

                  <Button className="w-full">Update Contact Information</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
