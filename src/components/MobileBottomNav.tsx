import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User, TrendingUp, Search, Bell, MessageCircle, Menu, ShoppingBag } from "lucide-react";
import UserProfile from "./UserProfile";
import TrendingSidebar from "./TrendingSidebar";

const MobileBottomNav = () => {
  const [activeSheet, setActiveSheet] = useState<'profile' | 'trending' | null>(null);

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
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full"
            >
              <Search className="h-5 w-5" />
            </Button>

            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
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

            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu with Sheets */}
          <Sheet open={activeSheet === 'profile'} onOpenChange={(open) => setActiveSheet(open ? 'profile' : null)}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-full"
              >
                <User className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <div className="py-4">
                <UserProfile />
                <div className="mt-6">
                  <TrendingSidebar />
                </div>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>

      {/* Top padding for content */}
      <div className="h-16 md:hidden"></div>
    </>
  );
};

export default MobileBottomNav;