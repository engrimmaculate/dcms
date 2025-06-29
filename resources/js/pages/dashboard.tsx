import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  MoreVertical,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Calendar,
  BarChart3,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Home,
  Folder,
  Archive,
  Share2
} from 'lucide-react';

const EDCMSAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data
  const [documents] = useState([
    { id: 1, name: 'Project Proposal 2025.pdf', type: 'PDF', size: '2.4 MB', modified: '2025-06-28', status: 'approved', author: 'John Smith', version: '1.2' },
    { id: 2, name: 'Marketing Strategy.docx', type: 'Word', size: '1.8 MB', modified: '2025-06-27', status: 'pending', author: 'Sarah Johnson', version: '2.1' },
    { id: 3, name: 'Financial Report Q2.xlsx', type: 'Excel', size: '3.1 MB', modified: '2025-06-26', status: 'draft', author: 'Mike Chen', version: '1.0' },
    { id: 4, name: 'User Manual v3.pdf', type: 'PDF', size: '5.2 MB', modified: '2025-06-25', status: 'approved', author: 'Lisa Wang', version: '3.0' },
    { id: 5, name: 'Meeting Minutes.docx', type: 'Word', size: '0.8 MB', modified: '2025-06-24', status: 'approved', author: 'Tom Wilson', version: '1.1' }
  ]);

  const [users] = useState([
    { id: 1, name: 'John Smith', email: 'john@company.com', role: 'Admin', status: 'active', lastLogin: '2025-06-28' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Editor', status: 'active', lastLogin: '2025-06-27' },
    { id: 3, name: 'Mike Chen', email: 'mike@company.com', role: 'Viewer', status: 'inactive', lastLogin: '2025-06-20' },
    { id: 4, name: 'Lisa Wang', email: 'lisa@company.com', role: 'Editor', status: 'active', lastLogin: '2025-06-28' }
  ]);

  const stats = {
    totalDocuments: 1247,
    pendingApprovals: 23,
    activeUsers: 156,
    storageUsed: '45.2 GB'
  };

  const notifications = [
    { id: 1, type: 'approval', message: 'Marketing Strategy.docx requires approval', time: '2 hours ago' },
    { id: 2, type: 'upload', message: 'New document uploaded by Sarah Johnson', time: '4 hours ago' },
    { id: 3, type: 'system', message: 'System maintenance scheduled for tonight', time: '1 day ago' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'draft': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default: return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const DocumentRow = ({ doc }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          checked={selectedDocuments.includes(doc.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedDocuments([...selectedDocuments, doc.id]);
            } else {
              setSelectedDocuments(selectedDocuments.filter(id => id !== doc.id));
            }
          }}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
            <div className="text-sm text-gray-500">{doc.type} • {doc.size}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.author}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.modified}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {getStatusIcon(doc.status)}
          <span className="ml-2 text-sm capitalize">{doc.status}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.version}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center space-x-2">
          <button className="text-blue-600 hover:text-blue-900"><Eye className="h-4 w-4" /></button>
          <button className="text-green-600 hover:text-green-900"><Download className="h-4 w-4" /></button>
          <button className="text-yellow-600 hover:text-yellow-900"><Edit className="h-4 w-4" /></button>
          <button className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
        </div>
      </td>
    </tr>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Documents" value={stats.totalDocuments.toLocaleString()} icon={FileText} color="bg-blue-500" />
        <StatCard title="Pending Approvals" value={stats.pendingApprovals} icon={Clock} color="bg-yellow-500" />
        <StatCard title="Active Users" value={stats.activeUsers} icon={Users} color="bg-green-500" />
        <StatCard title="Storage Used" value={stats.storageUsed} icon={Archive} color="bg-purple-500" />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {documents.slice(0, 5).map(doc => (
              <div key={doc.id} className="flex items-center space-x-4">
                <FileText className="h-8 w-8 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-sm text-gray-500">Modified by {doc.author} • {doc.modified}</p>
                </div>
                {getStatusIcon(doc.status)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Document Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            <span>Upload Document</span>
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
        {selectedDocuments.length > 0 && (
          <div className="flex space-x-2">
            <button className="text-red-600 hover:text-red-800">Delete Selected</button>
            <button className="text-blue-600 hover:text-blue-800">Download Selected</button>
          </div>
        )}
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.filter(doc => 
                doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.author.toLowerCase().includes(searchQuery.toLowerCase())
              ).map(doc => (
                <DocumentRow key={doc.id} doc={doc} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900"><Edit className="h-4 w-4" /></button>
                      <button className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">EDCMS Admin</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <button 
                  className="p-2 text-gray-400 hover:text-gray-600 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-6 w-6" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <div className="p-6">
            <div className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Home },
                { id: 'documents', label: 'Documents', icon: FileText },
                { id: 'upload', label: 'Upload', icon: Upload },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'documents' && renderDocuments()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'upload' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h3>
                  <p className="text-gray-500 mb-6">Drag and drop files here or click to browse</p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    Select Files
                  </button>
                </div>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics Dashboard</h3>
                <p className="text-gray-500">Analytics and reporting features coming soon...</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">System Settings</h3>
                <p className="text-gray-500">Configure system preferences and security settings...</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EDCMSAdminDashboard;