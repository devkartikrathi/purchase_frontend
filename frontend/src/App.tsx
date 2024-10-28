import { useState } from 'react';
import { Activity, Receipt, User as UserIcon, Menu, X } from 'lucide-react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Invoices from './components/Invoices';
import Profile from './components/Profile';
import { User } from './types';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = (token: string, user: User) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  if (!token) {
    return <Auth onLogin={handleLogin} />;
  }

  const navigation = [
    { name: 'Dashboard', icon: Activity, tab: 'dashboard' },
    { name: 'Invoices', icon: Receipt, tab: 'invoices' },
    { name: 'Profile', icon: UserIcon, tab: 'profile' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 right-0 m-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Top navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Receipt className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Purchase Manager</span>
            </div>
            {user && (
              <div className="hidden lg:flex items-center space-x-4">
                <span className="text-gray-700">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-25" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="h-full flex flex-col py-6 space-y-6">
              {navigation.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => {
                    setActiveTab(item.tab);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center px-4 py-2 text-sm font-medium ${
                    activeTab === item.tab
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </button>
              ))}
              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop navigation */}
      <div className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex">
            <div className="hidden lg:block w-64 fixed left-0 top-16 bottom-0 bg-white shadow-sm">
              <nav className="mt-8 space-y-1">
                {navigation.map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => setActiveTab(item.tab)}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === item.tab
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            <main className="flex-1 lg:ml-64 py-6">
              {activeTab === 'dashboard' && <Dashboard token={token} />}
              {activeTab === 'invoices' && <Invoices token={token} />}
              {activeTab === 'profile' && <Profile user={user} />}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;