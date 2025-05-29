import { onCreatePayment } from '@/services/actions/payment';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{
    session_id: string;
  }>;
}

export default async function Page(props: Props) {
  const { session_id } = await props.searchParams;
  if (session_id) {
    await onCreatePayment(session_id);
  }
  return redirect('/dashboard');
}
