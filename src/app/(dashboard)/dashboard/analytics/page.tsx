import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Analytics - Dashboard",
  description: "View analytics and insights for your portfolio",
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Track your portfolio performance and visitor insights
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,345</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,432</div>
                <p className="text-xs text-muted-foreground">
                  +15.3% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.4%</div>
                <p className="text-xs text-muted-foreground">
                  -2.1% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2m 34s</div>
                <p className="text-xs text-muted-foreground">
                  +5.2% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>
                Most visited pages in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>/</span>
                  <span className="font-medium">4,234 views</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>/projects</span>
                  <span className="font-medium">2,891 views</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>/about</span>
                  <span className="font-medium">1,567 views</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>/contact</span>
                  <span className="font-medium">892 views</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance</CardTitle>
              <CardDescription>
                Click-through rates and engagement for your projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>E-commerce Platform</span>
                  <span className="font-medium">156 clicks</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Task Management App</span>
                  <span className="font-medium">134 clicks</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Weather Dashboard</span>
                  <span className="font-medium">98 clicks</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>
                Where your visitors are coming from
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Direct</span>
                  <span className="font-medium">45.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Google</span>
                  <span className="font-medium">28.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Social Media</span>
                  <span className="font-medium">15.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Other</span>
                  <span className="font-medium">10.8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
