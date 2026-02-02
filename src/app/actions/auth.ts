'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type LoginState = {
  error?: string;
} | null;

export async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username and password are required' };
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user || !user.password) {
      return { error: 'Invalid credentials' };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return { error: 'Invalid credentials' };
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('internal_session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An error occurred during login' };
  }

  redirect('/dashboard');
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('internal_session');
    redirect('/internal-login');
}
