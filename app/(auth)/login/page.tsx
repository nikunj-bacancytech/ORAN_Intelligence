import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-telecom-700">
            Authentication placeholder
          </p>
          <CardTitle>Supabase auth routes are scaffolded and ready.</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-ink/70">
          <p>
            Wire your preferred auth method here. The current scaffold keeps the route structure and
            Supabase helpers ready without enforcing login during early MVP development.
          </p>
          <Link href="/dashboard" className="font-medium text-accent">
            Continue to demo dashboard
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
