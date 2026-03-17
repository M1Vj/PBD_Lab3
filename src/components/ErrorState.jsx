export default function ErrorState({ message }) {
  return (
    <div className="error-state" style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>
      <p>{message}</p>
    </div>
  );
}