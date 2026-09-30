// Mobile menu toggle: three lines, each ending in a dot. On open the outer lines
// run on, curl around the right side and come back as the two diagonals of an X
// (stroke-dash animation along one path), while the middle line fades out.

// The outer lines are long paths: a horizontal line, a curl, then the diagonal
const TOP_PATH =
  'M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058';
const BOTTOM_PATH =
  'M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942';

const PATH_CLASS =
  'fill-none stroke-current transition-[stroke-dasharray,stroke-dashoffset,stroke-opacity] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]';

interface MenuButtonProps {
  open: boolean;
  onClick: () => void;
  className?: string;
}

export function MenuButton({ open, onClick, className = '' }: MenuButtonProps) {
  // Closed: line + gap + dot. Open: the dash slides 134 units along to the diagonal.
  const outer = {
    strokeDasharray: open ? '90 0 0 300' : '42 10 8 300',
    strokeDashoffset: open ? -134 : 0,
  };

  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      className={`relative w-10 h-10 shrink-0 cursor-pointer ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-10 h-10"
        strokeWidth="5.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path className={PATH_CLASS} style={outer} d={TOP_PATH} />
        <path
          className={PATH_CLASS}
          style={{
            strokeDasharray: open ? '1 0 0 60' : '8 10 42 60',
            strokeDashoffset: open ? -30 : 0,
            strokeOpacity: open ? 0 : 1,
          }}
          d="M 20,50 H 80"
        />
        <path className={PATH_CLASS} style={outer} d={BOTTOM_PATH} />
      </svg>
    </button>
  );
}
