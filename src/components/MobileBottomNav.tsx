import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User, TrendingUp, Home } from "lucide-react";
import UserProfile from "./UserProfile";
import TrendingSidebar from "./TrendingSidebar";

const MobileBottomNav = () => {
  const [activeSheet, setActiveSheet] = useState<'profile' | 'trending' | null>(null);

  return (
    <>
      {/* Fixed Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/50 z-40 md:hidden">
        <div className="flex items-center justify-around py-2 px-4 max-w-sm mx-auto">
          
          {/* Home Button */}
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-12 px-3"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Home</span>
          </Button>

          {/* Profile Sheet Trigger */}
          <Sheet open={activeSheet === 'profile'} onOpenChange={(open) => setActiveSheet(open ? 'profile' : null)}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-12 px-3"
              >
                <User className="h-5 w-5" />
                <span className="text-xs font-medium">Profile</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
              <div className="py-4">
                <UserProfile />
              </div>
            </SheetContent>
          </Sheet>

          {/* Trending Sheet Trigger */}
          <Sheet open={activeSheet === 'trending'} onOpenChange={(open) => setActiveSheet(open ? 'trending' : null)}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-12 px-3"
              >
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs font-medium">Trending</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
              <div className="py-4">
                <TrendingSidebar />
              </div>
            </SheetContent>
          </Sheet>
          
        </div>
      </div>

      {/* Bottom padding for content */}
      <div className="h-16 md:hidden"></div>
    </>
  );
};

export default MobileBottomNav;