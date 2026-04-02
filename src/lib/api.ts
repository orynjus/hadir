export interface Student {
  id: number;
  name: string;
  avatar_url: string;
}

export interface AttendanceRecord {
  id: number;
  student_id: number;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

export const api = {
  getStudents: async (): Promise<Student[]> => {
    const res = await fetch('/api/students');
    return res.json();
  },
  createStudent: async (name: string, avatar_url?: string): Promise<Student> => {
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, avatar_url }),
    });
    return res.json();
  },
  updateStudent: async (id: number, name: string, avatar_url?: string): Promise<{ success: boolean }> => {
    const res = await fetch(`/api/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, avatar_url }),
    });
    return res.json();
  },
  getAttendance: async (date?: string): Promise<AttendanceRecord[]> => {
    const url = date ? `/api/attendance?date=${date}` : '/api/attendance';
    const res = await fetch(url);
    return res.json();
  },
  markAttendance: async (student_id: number, date: string, status: string): Promise<{ success: boolean }> => {
    const res = await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id, date, status }),
    });
    return res.json();
  }
};
