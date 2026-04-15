import { useNavigate } from "react-router-dom";
import { SearchX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full text-center">
        <div className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm">
          <div className="w-16 h-16 bg-zinc-50 text-zinc-400 border border-zinc-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <SearchX size={28} />
          </div>

          <h1 className="text-3xl font-semibold text-zinc-900 mb-2">404</h1>

          <p className="text-zinc-500 mb-8 text-sm">
            Oops! The page you're looking for has gone... and we can't find it.
          </p>

          <Button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center"
          >
            <ArrowLeft size={16} /> Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
