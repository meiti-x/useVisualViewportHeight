import { useEffect, useState } from 'react';

export const useVisualViewportHeight = () => {
  // this space is for user keyboard tools like suggestion and clipboard
  const ADDIONAL_SPACE = 60;

  const getWindowHeight = () =>
    window.visualViewport ? window.visualViewport.height - ADDIONAL_SPACE : window.innerHeight;

  const [height, setHeight] = useState<number>(getWindowHeight());

  useEffect(() => {
    const handleWindowResize = () => setHeight(getWindowHeight());

    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('orientationchange', handleWindowResize);
    window.visualViewport?.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('orientationchange', handleWindowResize);
      window.visualViewport?.removeEventListener('resize', handleWindowResize);
    };
  }, [getWindowHeight]);

  return height;
};


// usage
//   const viewportHieght = useVisualViewportHeight();
