import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
        Page not found
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        Try one of our calculators instead.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/calculators">
            <Calculator className="mr-2 size-4" />
            Browse Calculators
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="mr-2 size-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
