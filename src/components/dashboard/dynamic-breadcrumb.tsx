"use client";

import { usePathname } from "next/navigation";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define the breadcrumb routes and their display names
const routeMap: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/analytics": "Analytics", 
  "/dashboard/blog": "Blog Management",
  "/dashboard/create-post": "Create Post",
  "/dashboard/projects": "Projects",
};

// Define parent routes for nested breadcrumbs
const parentRoutes: Record<string, string[]> = {
  "/dashboard/create-post": ["/dashboard", "/dashboard/blog"],
  "/dashboard/blog": ["/dashboard"],
  "/dashboard/analytics": ["/dashboard"],
  "/dashboard/projects": ["/dashboard"],
};

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Get the breadcrumb path
  const getBreadcrumbPath = (currentPath: string) => {
    const paths = [];
    
    // Check if this route has specific parent routes
    if (parentRoutes[currentPath]) {
      // Add all parent routes
      for (const parentPath of parentRoutes[currentPath]) {
        paths.push({
          href: parentPath,
          label: routeMap[parentPath] || parentPath.split('/').pop() || '',
          isCurrentPage: false,
        });
      }
    } else {
      // Default behavior: add dashboard as parent if not already on dashboard
      if (currentPath !== "/dashboard") {
        paths.push({
          href: "/dashboard",
          label: routeMap["/dashboard"] || "Dashboard",
          isCurrentPage: false,
        });
      }
    }

    // Add current page
    paths.push({
      href: currentPath,
      label: routeMap[currentPath] || formatRouteName(currentPath),
      isCurrentPage: true,
    });

    return paths;
  };

  // Format route name from path if not in routeMap
  const formatRouteName = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'Page';
    
    // Convert kebab-case to Title Case
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const breadcrumbPath = getBreadcrumbPath(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbPath.map((item, index) => (
          <div key={item.href} className="flex items-center">
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {item.isCurrentPage ? (
                <BreadcrumbPage className="font-medium text-foreground">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink 
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbPath.length - 1 && (
              <BreadcrumbSeparator className={index === 0 ? "hidden md:block" : ""} />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
