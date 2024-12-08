import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const isUser = !!session?.user;
    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (!isUser) router.push("/login"); // If not authenticated, force log in
    }, [isUser, status]);

    if (isUser) {
      return <WrappedComponent {...props} />;
    }

    // Session is being fetched, or no user.
    // If no user, useEffect() will redirect.
    return null;
  };
};

export default withAuth;