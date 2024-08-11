export function Loader() {
  return (
    <div className="flex items-start gap-5 mt-5">
      <img
        className="rounded-full w-8 h-8 animate-spin"
        src={"/gemini_svg.svg"}
      />
      <div className="flex flex-col gap-4 pt-1 w-full">
        <div className="bg-[length:200%_200%] bg-gradient-to-tr from-blue-400 to-white rounded-md h-5 origin-left animate-gradient-x animate-scaleXIn" />
        <div className="bg-[length:200%_200%] bg-gradient-to-tr from-blue-400 to-white rounded-md h-5 origin-left animate-gradient-x animate-scaleXIn" />
        <div className="bg-[length:200%_200%] bg-gradient-to-tr from-blue-400 to-white rounded-md h-5 origin-left animate-gradient-x animate-scaleXIn" />
      </div>
    </div>
  );
}
