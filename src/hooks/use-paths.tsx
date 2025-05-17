import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const usePaths = () => {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState<Boolean>(true);

  useEffect(() => {
    if (pathname === "/") {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, [pathname]);

  return { isHomePage, pathname };
};
