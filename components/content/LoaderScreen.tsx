import React from "react";
import { Loader2 } from "lucide-react";

type Props = {
  show: boolean;
  label?: string;
};

export default function LoaderScreen({ show, label }: Props) {
  React.useEffect(() => {
    if (show) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [show]);

  return (
    <div
      className={`z-10 overflow-hidden absolute gap-4 ${
        show ? "flex flex-row" : "hidden"
      }  w-full h-full bg-black opacity-65 items-center justify-center m-0 p-0`}
    >
      <p className="text-white">{label || "Carregando"}...</p>
      <Loader2 color="white" className="h-5 w-5 animate-spin" />
    </div>
  );
}
