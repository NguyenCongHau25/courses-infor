// API utility functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'; // Port mặc định của NestJS là 3000, nên đổi backend sang 3001

export async function getCourses(query?: string) {
  const res = await fetch(`${API_BASE_URL}/courses${query ? `?search=${query}` : ''}`);
  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }
  return res.json();
}

export async function getCourseById(id: string) {
  const res = await fetch(`${API_BASE_URL}/courses/${id}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch course data');
  }
  return res.json();
}