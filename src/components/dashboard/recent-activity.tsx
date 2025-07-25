import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Recent actions and events</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-sm text-muted-foreground">Created new project</p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">2m ago</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage alt="Avatar" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Jane Smith</p>
            <p className="text-sm text-muted-foreground">Updated dashboard</p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">1h ago</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage alt="Avatar" />
            <AvatarFallback>MB</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Mike Brown</p>
            <p className="text-sm text-muted-foreground">Completed task</p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">3h ago</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage alt="Avatar" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Alice Blue</p>
            <p className="text-sm text-muted-foreground">Reviewed proposal</p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">5h ago</div>
        </div>
      </CardContent>
    </Card>
  )
}
