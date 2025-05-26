import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/Sellio.JPG" 
        alt="Sellio Logo" 
        className="h-10 w-auto rounded-lg"
      />
      <span className="text-xl font-semibold">Sellio</span>
    </Link>
  );
};
