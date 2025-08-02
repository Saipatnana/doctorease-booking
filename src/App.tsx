import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./Components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
