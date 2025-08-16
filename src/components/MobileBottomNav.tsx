import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User, TrendingUp, Search, Bell, MessageCircle, Menu, ShoppingBag, BarChart3, Activity } from "lucide-react";
import UserProfile from "./UserProfile";
import TrendingSidebar from "./TrendingSidebar";

const MobileBottomNav = () => {
  const [activeSheet, setActiveSheet] = useState<'profile' | 'trending' | null>(null);

  const handleSheetChange = (type: 'profile' | 'trending' | null) => {
    setActiveSheet(type);
  };

  return (
    <>
      {/* Top Navigation Bar for Mobile */}
      <div className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 z-50 md:hidden">
        <div className="flex items-center justify-between py-3 px-4">
          
          {/* App Logo */}
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>

          {/* Center Icons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full"
            >
              <Search className="h-5 w-5" />
            </Button>

            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mt-2">
              <span className="text-white text-xl font-bold">+</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full relative"
            >
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>

          </div>

          {/* Dashboard Icons with proper spacing */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-9 h-9 rounded-full"
              onClick={() => handleSheetChange('profile')}
            >
              <User className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-9 h-9 rounded-full"
              onClick={() => handleSheetChange('trending')}
            >
              <TrendingUp className="h-4 w-4" />
            </Button>
          </div>

        </div>
      </div>

      {/* Profile Sheet */}
      <Sheet open={activeSheet === 'profile'} onOpenChange={(open) => setActiveSheet(open ? 'profile' : null)}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
          <div className="py-4">
            <h3 className="text-xl font-bold mb-4">My Profile</h3>
            <UserProfile />
          </div>
        </SheetContent>
      </Sheet>

      {/* Trending Sheet */}
      <Sheet open={activeSheet === 'trending'} onOpenChange={(open) => setActiveSheet(open ? 'trending' : null)}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            <div className="flex-shrink-0 p-4 border-b bg-background">
              <h3 className="text-xl font-bold">What's Hot</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <TrendingSidebar />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Top padding for content */}
      <div className="h-16 md:hidden"></div>
    </>
  );
};

export default MobileBottomNav;