export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalViews: number;
  monthlyViews: number;
}

export interface AnalyticsData {
  pageViews: {
    page: string;
    views: number;
    change: number;
  }[];
  topProjects: {
    project: string;
    clicks: number;
    views: number;
  }[];
  timeRange: '7d' | '30d' | '90d' | '1y';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}
