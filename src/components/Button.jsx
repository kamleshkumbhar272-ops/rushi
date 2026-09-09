import { Link } from 'react-router-dom';

/**
 * Button / Link component
 *
 * Props:
 *  variant  — 'solid' | 'outline' (default: 'solid')
 *  to       — internal React Router path (renders <Link>)
 *  href     — external / anchor href (renders <a>)
 *  onClick  — click handler (renders <button>)
 *  children — label
 *  className — extra classes
 */
export default function Button({
  variant = 'solid',
  to,
  href,
  onClick,
  children,
  className = '',
  ...rest
}) {
  const cls = `btn-${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}