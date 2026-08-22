const COLORS = ['#A6192E', '#E8971B', '#142C6B', '#E8971B', '#A6192E'];

export default function Toran() {
  return (
    <div className="toran">
      {Array.from({ length: 14 }, (_, i) => (
        <svg key={i} width="34" height="30" viewBox="0 0 34 30">
          <path d="M17 0 L17 8" stroke="#B99552" strokeWidth="1" />
          <path d="M17 8 C 6 8, 6 26, 17 26 C 28 26, 28 8, 17 8 Z" fill={COLORS[i % COLORS.length]} opacity="0.85" />
          <circle cx="17" cy="16" r="3" fill="#FBF1DE" />
        </svg>
      ))}
    </div>
  );
}
