import { useState } from "react";
import { Edit3 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import CreatePost from "./CreatePost";

const CreatePostFAB = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const FabButton = (
    <div className="fixed top-20 right-6 z-40 md:top-6 md:right-6 md:z-50">
      <Button
        onClick={() => setOpen(true)}
        aria-label="Create a post"
        className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-500/25"
      >
        <Edit3 className="h-6 w-6" />
      </Button>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          {FabButton}
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader className="flex-shrink-0">
              <DrawerTitle>Create a Post</DrawerTitle>
            </DrawerHeader>
            <div className="flex-1 overflow-y-auto p-4">
              <CreatePost onSuccess={() => setOpen(false)} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          {FabButton}
          <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle>Create a Post</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto">
              <CreatePost onSuccess={() => setOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CreatePostFAB;
