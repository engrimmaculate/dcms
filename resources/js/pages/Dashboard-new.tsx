import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Calendar, 
  Bell, 
  Search,
  Menu,
  X,
  Settings,
  LogOut,
  Home,
  FileText,
  Award,
  BarChart3,
  User,
  ChevronDown,
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal
} from 'lucide-react';

interface DashboardData {
  stats: {
    totalStudents: number;
    totalCourses: number;
    totalInstructors: number;
    revenue: number;
  };
  recentCourses: Array<{
    id: number;
    title: string;
    instructor: string;
    students: number;
    completion: number;
    status: 'active' | 'draft' | 'archived';
  }>;
  recentStudents: Array<{
    id: number;
    name: string;
    email: string;
    enrolledCourses: number;
    lastActive: string;
    avatar: string;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Mock data - in real app this would come from Laravel backend via Inertia props
  const dashboardData: DashboardData = {
    stats: {
      totalStudents: 2847,
      totalCourses: 156,
      totalInstructors: 89,
      revenue: 128500
    },
    recentCourses: [
      {
        id: 1,
        title: "Advanced React Development",
        instructor: "John Smith",
        students: 234,
        completion: 78,
        status: 'active'
      },
      {
        id: 2,
        title: "Machine Learning Fundamentals",
        instructor: "Sarah Johnson",
        students: 189,
        completion: 65,
        status: 'active'
      },
      {
        id: 3,
        title: "UI/UX Design Principles",
        instructor: "Mike Chen",
        students: 156,
        completion: 45,
        status: 'draft'
      }
    ],
    recentStudents: [
      {
        id: 1,
        name: "Alice Cooper",
        email: "alice@example.com",
        enrolledCourses: 3,
        lastActive: "2 hours ago",
        avatar: "AC"
      },
      {
        id: 2,
        name: "Bob Wilson",
        email: "bob@example.com",
        enrolledCourses: 5,
        lastActive: "1 day ago",
        avatar: "BW"
      },
      {
        id: 3,
        name: "Carol Davis",
        email: "carol@example.com",
        enrolledCourses: 2,
        lastActive: "3 hours ago",
        avatar: "CD"
      }
    ]
  };

  const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, route: '/dashboard' },
  { id: 'courses', label: 'Courses', icon: BookOpen, route: '/courses' },
  { id: 'students', label: 'Students', icon: Users, route: '/students' },
  { id: 'instructors', label: 'Instructors', icon: GraduationCap, route: '/instructors' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, route: '/analytics' },
  { id: 'assignments', label: 'Assignments', icon: FileText, route: '/assignments' },
  { id: 'certificates', label: 'Certificates', icon: Award, route: '/certificates' },
  { id: 'settings', label: 'Settings', icon: Settings, route: '/settings' }
  ];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ElementType;
    trend?: string;
    color: string;
  }> = ({ title, value, icon: Icon, trend, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const CourseRow: React.FC<{ course: DashboardData['recentCourses'][0] }> = ({ course }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{course.title}</div>
        <div className="text-sm text-gray-500">{course.instructor}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {course.students}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${course.completion}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-900 min-w-max">{course.completion}%</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          course.status === 'active' ? 'bg-green-100 text-green-800' :
          course.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {course.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <button className="text-gray-400 hover:text-blue-600 p-1 rounded-full transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-gray-900 p-1 rounded-full transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="text-gray-400 hover:text-red-600 p-1 rounded-full transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  const StudentRow: React.FC<{ student: DashboardData['recentStudents'][0] }> = ({ student }) => (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-blue-600">{student.avatar}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{student.name}</p>
          <p className="text-sm text-gray-500 truncate">{student.email}</p>
        </div>
      </div>
      <div className="text-right flex-shrink-0 ml-2">
        <p className="text-sm text-gray-900">{student.enrolledCourses} courses</p>
        <p className="text-sm text-gray-500">{student.lastActive}</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}>
        
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">LMS Admin</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6 px-3 flex-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.route}
                className={`w-full flex items-center px-3 py-2.5 mb-1 text-sm font-medium rounded-lg transition-colors ${
                  window.location.pathname === item.route
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                style={{ textDecoration: 'none' }}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-30">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5" />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600">AU</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <span className="text-sm font-medium block">Admin User</span>
                    <span className="text-xs text-gray-500">Super Admin</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </a>
                    <hr className="my-1 border-gray-200" />
                    <a href="" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Page Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your LMS.</p>
                </div>
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Course
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Students"
                  value={dashboardData.stats.totalStudents.toLocaleString()}
                  icon={Users}
                  trend="+12% from last month"
                  color="bg-blue-500"
                />
                <StatCard
                  title="Total Courses"
                  value={dashboardData.stats.totalCourses}
                  icon={BookOpen}
                  trend="+5% from last month"
                  color="bg-green-500"
                />
                <StatCard
                  title="Instructors"
                  value={dashboardData.stats.totalInstructors}
                  icon={GraduationCap}
                  trend="+8% from last month"
                  color="bg-purple-500"
                />
                <StatCard
                  title="Revenue"
                  value={`$${dashboardData.stats.revenue.toLocaleString()}`}
                  icon={TrendingUp}
                  trend="+23% from last month"
                  color="bg-orange-500"
                />
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Courses Table */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Courses</h2>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
                          <Filter className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Students
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Progress
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dashboardData.recentCourses.map((course) => (
                          <CourseRow key={course.id} course={course} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent Students */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Students</h2>
                  </div>
                  <div className="p-4 space-y-2 flex-1">
                    {dashboardData.recentStudents.map((student) => (
                      <StudentRow key={student.id} student={student} />
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View all students
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {sidebarItems.find(item => item.id === activeTab)?.label} Page
              </h2>
              <p className="text-gray-600">
                This would be the {activeTab} management interface. In a real Laravel Inertia app, 
                each tab would load different components with data from your backend controllers.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;
