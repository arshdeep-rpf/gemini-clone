import GridIcon from "@/icons/grid.svg";

export const AppHeader = () => (
  <div className="flex justify-between px-4 pt-6 pb-4">
    <h2 className="text-slate-600 text-xl">Gemini</h2>
    <div className="flex items-center gap-4">
      <GridIcon />
      <img src="/user.jpg" className="rounded-full w-8 h-8" />
    </div>
  </div>
);
