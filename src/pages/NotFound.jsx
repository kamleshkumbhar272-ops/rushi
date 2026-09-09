import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--navy)',
        padding: '64px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '80px',
          fontFamily: "'Cinzel', serif",
          color: 'var(--gold)',
          marginBottom: '24px',
          lineHeight: 1,
        }}
      >
        404
      </div>
      <SectionTitle
        title="Page Not Found"
        sub="The page you are looking for doesn't exist or has been moved."
      />
      <Link to="/" className="btn-gold" style={{ marginTop: '16px' }}>
        Back to Home
      </Link>
    </section>
  );
}
