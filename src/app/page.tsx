import { redirect } from 'next/navigation';

// Root page redirects to default locale (/zh)
export default function RootPage() {
  redirect('/zh');
}
