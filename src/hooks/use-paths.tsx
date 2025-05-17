import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const usePaths = () => {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState<boolean>(true);

  useEffect(() => {
    if (pathname === '/') {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, [pathname]);

  const handleIsActiveRoute = (path: string) => {
    return path === pathname && 'bg-muted-foreground text-white  hover:text-white hover:bg-muted-foreground';
  };

  return { isHomePage, pathname, handleIsActiveRoute };
};
