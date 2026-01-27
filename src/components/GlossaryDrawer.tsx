import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function GlossaryDrawer({
  open,
  onClose,
  term,
  definition,
}: {
  open: boolean;
  onClose: () => void;
  term: string;
  definition: string;
}) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <h2 className="text-lg font-semibold mb-3">{term}</h2>
        <p className="text-sm text-muted-foreground">{definition}</p>
      </SheetContent>
    </Sheet>
  );
}
