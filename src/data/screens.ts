// Store screenshots in public/screens/<slug>/<n>.webp, in display order.
const set = (slug: string, app: string, captions: string[]) =>
  captions.map((c, i) => ({ src: `screens/${slug}/${i + 1}.webp`, alt: `${app}: ${c}` }));

export const screens = {
  'edulens-student-app': set('edulens-student-app', 'EduLens', [
    'Home page with subjects and lecturers',
    'Create account screen',
    'Course lecture list',
    'Buying a single lecture',
    'Sign-up form',
    'Course packages on the home page',
    'Welcome artwork',
  ]),
  'carven': set('carven', 'CARVEN', [
    'All courses in one place',
    'Lecture videos for a course',
    'Enrolled centres and attendance',
    'Course details',
    'Courses at a centre',
  ]),
  'edulens-scanner': set('edulens-scanner', 'EduLens Scanner', [
    'Attendance sessions with pending sync',
    'Choosing a centre',
    'Lectures in a centre',
    'Sign-in screen',
  ]),
  'qanoni': set('qanoni', 'Qanoni', [
    'Welcome screen',
    'Choosing the study year',
    'Subjects for the first year',
    'Course page with notes and question bank',
    'Store for notes and accessories',
  ]),
};
