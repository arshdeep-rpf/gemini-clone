export const PromptCard = ({
  Icon,
  prompt,
  onClick,
}: {
  Icon?: any;
  prompt: string;
  onClick: (prompt: string) => void;
}) => (
  <div
    onClick={() => onClick(prompt)}
    className="flex flex-col justify-between bg-grey1 hover:bg-grey5 p-4 rounded-md w-[200px] min-w-[200px] h-[200px] cursor-pointer"
  >
    <p>{prompt}</p>
    {Icon ? (
      <div className="bg-white p-2 rounded-full self-end">
        <Icon />
      </div>
    ) : null}
  </div>
);
