import { useState } from 'react';
import { LayoutDashboard, Users, CalendarCheck, LogOut, User, History, FileText, MonitorPlay, FileSpreadsheet, ScanLine, QrCode, Settings, Menu, X } from 'lucide-react';
import { Toaster } from 'sonner';
import Dashboard from './components/Dashboard';
import Attendance from './components/Attendance';
import Students from './components/Students';
import LandingPage from './components/LandingPage';
import StudentProfile from './components/StudentProfile';
import StudentHistory from './components/StudentHistory';
import StudentLeaveRequest from './components/StudentLeaveRequest';
import TeacherMonitor from './components/TeacherMonitor';
import TeacherProfile from './components/TeacherProfile';
import TeacherHistory from './components/TeacherHistory';
import HomeroomMonitor from './components/HomeroomMonitor';
import HomeroomProfile from './components/HomeroomProfile';
import HomeroomHistory from './components/HomeroomHistory';
import HomeroomRecap from './components/HomeroomRecap';
import AdminOverview from './components/AdminOverview';
import AdminScanner from './components/AdminScanner';
import AdminUsers from './components/AdminUsers';
import AdminManualAttendance from './components/AdminManualAttendance';
import AdminPrintQR from './components/AdminPrintQR';
import AdminRecap from './components/AdminRecap';
import AdminSettings from './components/AdminSettings';

export default function App() {
  const [role, setRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!role) {
    return <LandingPage onSelectRole={(r) => {
      setRole(r);
      if (r === 'siswa') setActiveTab('profile');
      else if (r === 'guru' || r === 'walikelas') setActiveTab('monitor');
      else if (r === 'admin') setActiveTab('overview');
      else setActiveTab('dashboard');
    }} />;
  }

  const adminTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'scanner', label: 'Scanner', icon: ScanLine },
    { id: 'users', label: 'Kelola User', icon: Users },
    { id: 'manual', label: 'Absen Manual', icon: CalendarCheck },
    { id: 'print', label: 'Cetak QR Code', icon: QrCode },
    { id: 'recap', label: 'Rekap Absensi', icon: FileSpreadsheet },
    { id: 'settings', label: 'Setelan', icon: Settings },
  ];

  const studentTabs = [
    { id: 'profile', label: 'Profil Pribadi', icon: User },
    { id: 'history', label: 'Riwayat Absensi', icon: History },
    { id: 'leave', label: 'Pengajuan Izin', icon: FileText },
  ];

  const teacherTabs = [
    { id: 'monitor', label: 'Monitor Siswa', icon: MonitorPlay },
    { id: 'profile', label: 'Profil Pribadi', icon: User },
    { id: 'history', label: 'Riwayat Absensi', icon: History },
  ];

  const homeroomTabs = [
    { id: 'monitor', label: 'Monitor Siswa', icon: MonitorPlay },
    { id: 'recap', label: 'Rekap Absensi', icon: FileSpreadsheet },
    { id: 'profile', label: 'Profil Pribadi', icon: User },
    { id: 'history', label: 'Riwayat Absensi', icon: History },
  ];

  const tabs = role === 'siswa' ? studentTabs : role === 'guru' ? teacherTabs : role === 'walikelas' ? homeroomTabs : adminTabs;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900 overflow-hidden relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 z-20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-gray-900">HadirAI</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col h-full transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="hidden md:flex p-6 border-b border-gray-100 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-sm">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">HadirAI</h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-100 space-y-4">
          <button 
            onClick={() => setRole(null)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Keluar ({role})</span>
          </button>
          <div className="bg-indigo-50 rounded-xl p-4 text-sm text-indigo-800 border border-indigo-100">
            <p className="font-semibold mb-1">Powered by Gemini</p>
            <p className="opacity-80 text-xs">Flash Image</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto w-full max-w-7xl mx-auto">
        {/* Admin */}
        {role === 'admin' && activeTab === 'overview' && <AdminOverview />}
        {role === 'admin' && activeTab === 'scanner' && <AdminScanner />}
        {role === 'admin' && activeTab === 'users' && <AdminUsers />}
        {role === 'admin' && activeTab === 'manual' && <AdminManualAttendance />}
        {role === 'admin' && activeTab === 'print' && <AdminPrintQR />}
        {role === 'admin' && activeTab === 'recap' && <AdminRecap />}
        {role === 'admin' && activeTab === 'settings' && <AdminSettings />}
        
        {/* Siswa */}
        {role === 'siswa' && activeTab === 'profile' && <StudentProfile />}
        {role === 'siswa' && activeTab === 'history' && <StudentHistory />}
        {role === 'siswa' && activeTab === 'leave' && <StudentLeaveRequest />}

        {/* Guru */}
        {role === 'guru' && activeTab === 'monitor' && <TeacherMonitor />}
        {role === 'guru' && activeTab === 'profile' && <TeacherProfile />}
        {role === 'guru' && activeTab === 'history' && <TeacherHistory />}

        {/* Wali Kelas */}
        {role === 'walikelas' && activeTab === 'monitor' && <HomeroomMonitor />}
        {role === 'walikelas' && activeTab === 'recap' && <HomeroomRecap />}
        {role === 'walikelas' && activeTab === 'profile' && <HomeroomProfile />}
        {role === 'walikelas' && activeTab === 'history' && <HomeroomHistory />}
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}
