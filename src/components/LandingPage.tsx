import { useState, FormEvent } from 'react';
import { GraduationCap, BookOpen, Users, Shield, ArrowLeft, Lock, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingPageProps {
  onSelectRole: (role: string) => void;
}

export default function LandingPage({ onSelectRole }: LandingPageProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const roles = [
    {
      id: 'siswa',
      title: 'Siswa',
      description: 'Lihat absensi, jadwal, dan nilai Anda.',
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      hoverColor: 'hover:bg-blue-100 hover:border-blue-300',
      iconBg: 'bg-blue-100',
      identifierLabel: 'NIS (Nomor Induk Siswa)',
      identifierPlaceholder: 'Masukkan NIS Anda',
    },
    {
      id: 'guru',
      title: 'Guru',
      description: 'Kelola absensi kelas dan materi pelajaran.',
      icon: BookOpen,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      hoverColor: 'hover:bg-emerald-100 hover:border-emerald-300',
      iconBg: 'bg-emerald-100',
      identifierLabel: 'NIP (Nomor Induk Pegawai)',
      identifierPlaceholder: 'Masukkan NIP Anda',
    },
    {
      id: 'walikelas',
      title: 'Wali Kelas',
      description: 'Pantau perkembangan dan absensi kelas perwalian.',
      icon: Users,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      hoverColor: 'hover:bg-amber-100 hover:border-amber-300',
      iconBg: 'bg-amber-100',
      identifierLabel: 'NIP (Nomor Induk Pegawai)',
      identifierPlaceholder: 'Masukkan NIP Anda',
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Kelola data master, pengguna, dan pengaturan sistem.',
      icon: Shield,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      hoverColor: 'hover:bg-purple-100 hover:border-purple-300',
      iconBg: 'bg-purple-100',
      identifierLabel: 'Username',
      identifierPlaceholder: 'Masukkan Username',
    },
  ];

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'admin') {
      if (identifier && password) {
        onSelectRole(selectedRole);
      }
    } else if (selectedRole && identifier) {
      onSelectRole(selectedRole);
    }
  };

  const activeRoleData = roles.find(r => r.id === selectedRole);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-5xl w-full">
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div 
              key="role-selection"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white shadow-lg mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                  Selamat Datang di HadirAI
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Sistem absensi cerdas berbasis AI. Silakan pilih peran Anda untuk masuk ke dalam sistem.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {roles.map((role, index) => {
                  const Icon = role.icon;
                  return (
                    <motion.button
                      key={role.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      onClick={() => {
                        setSelectedRole(role.id);
                        setIdentifier('');
                        setPassword('');
                      }}
                      className={`flex flex-col items-center text-center p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer ${role.color} ${role.hoverColor} shadow-sm hover:shadow-md`}
                    >
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${role.iconBg}`}>
                        <Icon className="w-10 h-10" />
                      </div>
                      <h2 className="text-xl font-bold mb-3 text-gray-900">{role.title}</h2>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {role.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-md mx-auto"
            >
              <button 
                onClick={() => setSelectedRole(null)}
                className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali ke pilihan peran
              </button>

              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className={`${activeRoleData?.color} p-8 text-center border-b-0`}>
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-white shadow-sm`}>
                    {activeRoleData && <activeRoleData.icon className={`w-10 h-10 ${activeRoleData.color.split(' ')[1]}`} />}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Login {activeRoleData?.title}</h2>
                  <p className="text-gray-600 mt-2">Masukkan kredensial Anda untuk melanjutkan</p>
                </div>

                <div className="p-8">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 block">
                        {activeRoleData?.identifierLabel}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          required
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
                          placeholder={activeRoleData?.identifierPlaceholder}
                        />
                      </div>
                    </div>

                    {selectedRole === 'admin' && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">
                          Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
                            placeholder="Masukkan password Anda"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Masuk
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
