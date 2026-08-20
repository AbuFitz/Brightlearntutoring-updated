import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSEO } from "@/hooks/useSEO";

const NotFound = () => {
  const location = useLocation();

  useSEO({
    title: "Page Not Found — BrightLearn Tutoring",
    description: "The page you're looking for doesn't exist. Return to BrightLearn Tutoring's homepage.",
    path: location.pathname,
    noindex: true,
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-ink">404</h1>
        <p className="mb-6 text-lg text-ink-soft">
          Oops! This page doesn't exist. Try our{" "}
          <Link to="/enquire" className="text-accent hover:underline">enquiry form</Link> instead.
        </p>
        <Link to="/" className="text-accent underline hover:text-accent/80">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
