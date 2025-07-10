export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#1f1f1f] text-yellow-400">
      <div className="relative w-24 h-24">
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-red-600 animate-spin"
          style={{ animationDuration: "1s" }} // default fast spin
        ></div>

        {/* Inner ring with slower spin */}
        <div
          className="absolute inset-3 rounded-full border-2 border-t-transparent border-l-transparent border-yellow-400 animate-spin"
          style={{ animationDuration: "3s" }} // slower spin here
        ></div>

        {/* Inner pulse glow */}
        <div className="absolute inset-8 bg-red-800/20 backdrop-blur rounded-full shadow-inner shadow-yellow-700/30" />
      </div>
    </div>
  );
};

export const LoadingAnimation = () => {
  return (
    <div
      className="inline-block w-5 h-5 border-2 border-t-transparent border-b-transparent border-yellow-400 rounded-full animate-spin"
      style={{ animationDuration: "1.5s" }}
    ></div>
  );
};
