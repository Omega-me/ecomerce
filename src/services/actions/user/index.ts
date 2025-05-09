'use server';
import { createUser, findUser } from '@/services/queries/user';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const onCurrentUser = async () => {
  const user = await currentUser();
  if (!user) return redirect('sign-in');
  return user;
};

export const onUserInfo = async () => {
  const user = await onCurrentUser();
  try {
    const profile = await findUser(user.id);
    if (!profile) return { status: 404 };
    return { status: 200, data: profile };
  } catch (error) {
    console.error('Error:', error);
    return { status: 500 };
  }
};

export const onBoardUser = async () => {
  const user = await onCurrentUser();
  try {
    const found = await findUser(user.id);
    if (found) return { status: 200, data: found };

    // new user is created on db
    const created = await createUser({
      clerkId: user.id,
      firstName: user.firstName!,
      lastName: user.lastName!,
    });
    return {
      status: 201,
      data: created,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
    };
  }
};
