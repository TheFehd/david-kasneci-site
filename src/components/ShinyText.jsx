// react-bits — ShinyText (adapted to the rationed-gold palette).
// A slow highlight sweep across the text via background-clip.
export default function ShinyText({ text, speed = 6, className = '' }) {
  return (
    <span className={`shiny-text ${className}`} style={{ animationDuration: `${speed}s` }}>
      {text}
    </span>
  );
}
