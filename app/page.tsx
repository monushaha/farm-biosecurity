import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, Users, BookOpen, Bell, BarChart3, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

export default function FarmBiosecurityDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">FarmGuard Pro</h1>
                <p className="text-sm text-muted-foreground">Biosecurity Management Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/alerts">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Alerts
                </Button>
              </Link>
              <Button size="sm">
                <Users className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Biosecurity Score</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">87%</div>
              <Progress value={87} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 medium, 1 low priority</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">94%</div>
              <p className="text-xs text-muted-foreground">All protocols up to date</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Training Progress</CardTitle>
              <BookOpen className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6/8</div>
              <Progress value={75} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">2 modules remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Recent Alerts
                </CardTitle>
                <CardDescription>Monitor biosecurity incidents and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <div>
                      <p className="font-medium">Visitor log incomplete</p>
                      <p className="text-sm text-muted-foreground">Poultry House A - 2 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="destructive">High</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Equipment sanitization due</p>
                      <p className="text-sm text-muted-foreground">Pig Barn B - 4 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Medium</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Training module available</p>
                      <p className="text-sm text-muted-foreground">Disease Prevention - 1 day ago</p>
                    </div>
                  </div>
                  <Badge variant="outline">Info</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common biosecurity tasks and assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/risk-assessment">
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent w-full">
                      <BarChart3 className="h-6 w-6" />
                      <span className="text-xs">Risk Assessment</span>
                    </Button>
                  </Link>
                  <Link href="/training">
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent w-full">
                      <BookOpen className="h-6 w-6" />
                      <span className="text-xs">Training</span>
                    </Button>
                  </Link>
                  <Link href="/compliance">
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent w-full">
                      <CheckCircle className="h-6 w-6" />
                      <span className="text-xs">Compliance</span>
                    </Button>
                  </Link>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <MapPin className="h-6 w-6" />
                    <span className="text-xs">Site Map</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Farm Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Farm Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Farm Type</span>
                  <Badge>Mixed (Pig & Poultry)</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Animals</span>
                  <span className="font-medium">2,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Buildings</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Inspection</span>
                  <span className="font-medium">3 days ago</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 border rounded">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Weekly sanitization</p>
                    <p className="text-xs text-muted-foreground">Due tomorrow</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 border rounded">
                  <BookOpen className="h-4 w-4 text-accent" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Complete training module</p>
                    <p className="text-xs text-muted-foreground">Due in 3 days</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 border rounded">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Monthly risk assessment</p>
                    <p className="text-xs text-muted-foreground">Due in 1 week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Alert */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800">Weather Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-yellow-700">
                  Heavy rain expected this week. Review drainage protocols and ensure proper ventilation in all
                  buildings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
