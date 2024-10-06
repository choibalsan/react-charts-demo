export const NotFoundPage = () => {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg">Sorry, the page you're looking for doesn't exist.</p>
        <a href="/dashboard" className="mt-4 p-2 bg-blue-500 text-white rounded">
          Go to dashboard
        </a>
      </div>
  );
};
