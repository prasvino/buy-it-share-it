import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User, TrendingUp, Search, Bell, MessageCircle, Menu, ShoppingBag, BarChart3, Activity } from "lucide-react";
import UserProfile from "./UserProfile";
import TrendingSidebar from "./TrendingSidebar";

const MobileBottomNav = () => {
  const [activeSheet, setActiveSheet] = useState<'profile' | 'trending' | 'stats' | null>(null);

  const handleSheetChange = (type: 'profile' | 'trending' | 'stats' | null) => {
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
            
            <Button
              variant="ghost"
              size="sm"
              className="w-9 h-9 rounded-full bg-muted/50"
              onClick={() => handleSheetChange('stats')}
            >
              <BarChart3 className="h-4 w-4" />
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
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
          <div className="py-4">
            <h3 className="text-xl font-bold mb-4">What's Hot</h3>
            <TrendingSidebar />
          </div>
        </SheetContent>
      </Sheet>

      {/* Stats Sheet */}
      <Sheet open={activeSheet === 'stats'} onOpenChange={(open) => setActiveSheet(open ? 'stats' : null)}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl overflow-hidden">
          <div className="h-full flex flex-col">
            <h3 className="text-xl font-bold py-4 border-b">Live Platform Stats</h3>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-xl border border-blue-200/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-muted-foreground">Total Posts</span>
                  </div>
                  <div className="text-2xl font-bold">24,891</div>
                  <div className="text-xs text-green-500">+12% today</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-4 rounded-xl border border-green-200/20">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingBag className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-muted-foreground">Money Spent</span>
                  </div>
                  <div className="text-2xl font-bold">$2.4M</div>
                  <div className="text-xs text-green-500">+8% today</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-xl border border-purple-200/20">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-5 w-5 text-purple-500" />
                    <span className="text-sm font-medium text-muted-foreground">Active Users</span>
                  </div>
                  <div className="text-2xl font-bold">89,234</div>
                  <div className="text-xs text-green-500">+15% today</div>
                </div>
                
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-4 rounded-xl border border-orange-200/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-medium text-muted-foreground">Purchases</span>
                  </div>
                  <div className="text-2xl font-bold">3,456</div>
                  <div className="text-xs text-green-500">+23% today</div>
                </div>
              </div>
              
              {/* Additional stats sections for scrolling demo */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Recent Activity</h4>
                <div className="space-y-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-sm font-medium">Activity {i}</div>
                      <div className="text-xs text-muted-foreground">Sample activity description</div>
                    </div>
                  ))}
                </div>
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