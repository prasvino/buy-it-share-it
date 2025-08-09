import { useState } from "react";
import { Plus } from "lucide-react";
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
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => setOpen(true)}
        aria-label="Create a post"
        className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-500/25"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          {FabButton}
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Create a Post</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <CreatePost />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          {FabButton}
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create a Post</DialogTitle>
            </DialogHeader>
            <CreatePost />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CreatePostFAB;
