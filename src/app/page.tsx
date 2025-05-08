import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const user = await currentUser();
  const data = {
    id: user?.id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.emailAddresses[0]?.emailAddress,
  };

  console.log(data);
  console.log(user);
  return <div>Home page</div>;
}
