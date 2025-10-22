import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import DashboardRoleSpecific from './pages/dashboard-role-specific';
import NotificationsCenter from './pages/notifications-center';
import UserManagementPortal from './pages/user-management-portal';
import TaskManagementInterface from './pages/task-management-interface';
import TeamOverview from './pages/team-overview';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DashboardRoleSpecific />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/dashboard-role-specific" element={<DashboardRoleSpecific />} />
        <Route path="/notifications-center" element={<NotificationsCenter />} />
        <Route path="/user-management-portal" element={<UserManagementPortal />} />
        <Route path="/task-management-interface" element={<TaskManagementInterface />} />
        <Route path="/team-overview" element={<TeamOverview />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
