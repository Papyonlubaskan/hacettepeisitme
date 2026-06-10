/** Bot koruması — sunucu dolu `website` alanını reddeder */
export default function FormHoneypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute -left-[9999px] h-0 w-0 opacity-0 pointer-events-none"
    />
  );
}
