import { useState, useEffect } from 'react';
import { api, Student, AttendanceRecord } from '../lib/api';

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [st, att] = await Promise.all([
      api.getStudents(),
      api.getAttendance()
    ]);
    setStudents(st);
    setRecords(att);
    setLoading(false);
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

  const today = new Date().toISOString().split('T')[0];
  const todayRecords = records.filter(r => r.date === today);
  const presentCount = todayRecords.filter(r => r.status === 'present').length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Total Siswa</div>
          <div className="text-4xl font-bold text-gray-900">{students.length}</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Hadir Hari Ini</div>
          <div className="text-4xl font-bold text-green-600">{presentCount}</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium mb-1">Tingkat Kehadiran</div>
          <div className="text-4xl font-bold text-indigo-600">
            {students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0}%
          </div>
        </div>
      </div>
    </div>
  );
}
