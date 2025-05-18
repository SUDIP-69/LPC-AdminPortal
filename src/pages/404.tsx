import Link from 'next/link';
import { Home } from 'lucide-react';
import Button from '../components/common/Button';

function NotFound() {
  return (
    <div className="min-h-screen bg-white px-4 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-primary-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Page not found</h2>
        <p className="mt-6 text-base text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
        <div className="mt-10">
          <Link href="/">
            <Button variant="primary" icon={<Home className="h-5 w-5" />}>
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;