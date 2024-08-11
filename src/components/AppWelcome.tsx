export const AppWelcome = ({
  username,
  welcomeMessage,
}: {
  username: string;
  welcomeMessage: string;
}) => {
  return (
    <div className="mb-20 tracking-tighter origin-left animate-fadeIn">
      <h1 className="bg-clip-text bg-gradient-text font-semibold text-[3.5rem] text-transparent leading-[1.2] whitespace-nowrap animate-typing overflow-hidden">
        Hello, {username}
      </h1>
      <h2 className="font-semibold text-[3.5rem] text-grey4 leading-[1.2]">
        {welcomeMessage}
      </h2>
    </div>
  );
};
