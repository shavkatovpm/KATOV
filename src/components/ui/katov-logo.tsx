/**
 * KATOV logo mark — vector trace of logo.png (verified pixel-identical to
 * the raster within anti-aliasing tolerance). The two shapes are exported
 * separately so animations can move the stem and the chevron independently.
 */

export const LOGO_VIEWBOX = '0 0 730 1172';

/** Vertical stem of the lowercase "k". */
export const STEM_PATH = 'M0 0H212V1172H0Z';

/** Chevron arm of the "k". */
export const CHEVRON_PATH = 'M464 303H730L478 577L730 851H464L212 577Z';

interface KatovLogoProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export function KatovLogo({ title = 'KATOV', ...props }: KatovLogoProps) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      fill="currentColor"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={STEM_PATH} />
      <path d={CHEVRON_PATH} />
    </svg>
  );
}
