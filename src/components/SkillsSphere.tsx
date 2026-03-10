import React, { useEffect, useState } from 'react';
import { Cloud, fetchSimpleIcons, ICloud, renderSimpleIcon, SimpleIcon } from 'react-icon-cloud';

const cloudProps: Omit<ICloud, 'children'> = {
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingTop: 40,
    },
  },
  options: {
    clickToFront: 500,
    depth: 1,
    imageScale: 2,
    initial: [0.1, -0.1],
    outlineColour: '#0000',
    reverse: true,
    tooltip: 'native',
    tooltipDelay: 0,
    wheelZoom: false,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === 'light' ? '#f3f2ef' : '#080510';
  const fallbackHex = theme === 'light' ? '#6e6e73' : '#ffffff';
  const minContrastRatio = theme === 'dark' ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

export function SkillsSphere({ slugs }: { slugs: string[] }) {
  const [data, setData] = useState<{ simpleIcons: Record<string, SimpleIcon> } | null>(null);

  useEffect(() => {
    fetchSimpleIcons({ slugs }).then(setData);
  }, [slugs]);

  const renderedIcons = React.useMemo(() => {
    if (!data) return null;
    
    // Determine theme based on document class
    const isDark = document.documentElement.classList.contains('dark');
    const theme = isDark ? 'dark' : 'light';

    return (Object.values(data.simpleIcons) as SimpleIcon[]).map((icon) =>
      renderCustomIcon(icon, theme)
    );
  }, [data]);

  return (
    <div className="w-full max-w-md mx-auto aspect-square flex items-center justify-center">
      {renderedIcons ? (
        <Cloud {...cloudProps}>
          {renderedIcons}
        </Cloud>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
