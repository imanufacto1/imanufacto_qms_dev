'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Factory } from 'lucide-react';

export default function InternalLoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Factory className="h-12 w-12 text-primary" />
            </div>
          <CardTitle>Internal Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="Enter username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter password" required />
            </div>
            {state?.error && (
              <p className="text-sm text-red-500 font-medium">{state.error}</p>
            )}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? 'Logging in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
