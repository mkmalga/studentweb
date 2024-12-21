const mockData = {
    subjects: [
        { id: 1, name: 'Mathematics', teacher: 'Dr. Smith', totalClasses: 40 },
        { id: 2, name: 'Physics', teacher: 'Prof. Johnson', totalClasses: 35 },
        { id: 3, name: 'Computer Science', teacher: 'Dr. Williams', totalClasses: 45 }
    ],
    students: {
        'john@example.com': {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            subjects: {
                1: { marks: 85, attendance: 35 },
                2: { marks: 78, attendance: 30 },
                3: { marks: 92, attendance: 42 }
            }
        }
    }
};