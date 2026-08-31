import { setToastAdapter } from "./toast-adapter";
import { sonnerAdapter } from "./adapters/sonner";
import { reactHotToastAdapter } from "./adapters/react-hot-toast";

const TOAST_LIBRARY = process.env.NEXT_PUBLIC_TOAST_LIBRARY ?? "sonner";

if (TOAST_LIBRARY === "sonner") {
  setToastAdapter(sonnerAdapter);
}

if (TOAST_LIBRARY === "react-hot-toast") {
  setToastAdapter(reactHotToastAdapter);
}
