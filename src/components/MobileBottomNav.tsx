import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User, TrendingUp, Search, Bell, MessageCircle, Menu, ShoppingBag, BarChart3, Activity } from "lucide-react";
import UserProfile from "./UserProfile";
import TrendingSidebar from "./TrendingSidebar";

const MobileBottomNav = () => {
  const [activeSheet, setActiveSheet] = useState<'profile' | 'trending' | 'stats' | 'menu' | null>(null);

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

          {/* Hamburger Menu Button */}
          <Sheet open={activeSheet === 'menu'} onOpenChange={(open) => setActiveSheet(open ? 'menu' : null)}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-full bg-muted/50"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <div className="py-4 space-y-4">
                <h2 className="text-lg font-semibold mb-6">Dashboard</h2>
                
                {/* Profile Section */}
                <Sheet open={activeSheet === 'profile'} onOpenChange={(open) => setActiveSheet(open ? 'profile' : null)}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-12"
                    >
                      <User className="h-5 w-5" />
                      <span>My Profile</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
                    <div className="py-4">
                      <UserProfile />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Trending/What's Hot Section */}
                <Sheet open={activeSheet === 'trending'} onOpenChange={(open) => setActiveSheet(open ? 'trending' : null)}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-12"
                    >
                      <TrendingUp className="h-5 w-5" />
                      <span>What's Hot</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
                    <div className="py-4">
                      <TrendingSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Live Stats Section */}
                <Sheet open={activeSheet === 'stats'} onOpenChange={(open) => setActiveSheet(open ? 'stats' : null)}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-12"
                    >
                      <BarChart3 className="h-5 w-5" />
                      <span>Live Stats</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
                    <div className="py-4">
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold">Live Platform Stats</h3>
                        
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
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
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