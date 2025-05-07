
import { useState } from "react";
import { Cookie } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieSettings = () => {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false,
  });

  const handleToggle = (type: keyof CookiePreferences) => {
    if (type === "necessary") return; // Necessary cookies can't be disabled
    
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const savePreferences = () => {
    // In a real app, this would save to localStorage or cookies
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    toast.success("Ustawienia plików cookie zostały zapisane");
    setOpen(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted));
    toast.success("Wszystkie pliki cookie zostały zaakceptowane");
    setOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setOpen(true)}
          className="bg-gingerbread text-white p-3 rounded-full shadow-lg hover:bg-gingerbread-dark transition-colors"
          aria-label="Cookie settings"
        >
          <Cookie size={20} />
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ustawienia plików cookie</DialogTitle>
            <DialogDescription>
              Używamy plików cookie, aby zapewnić najlepsze doświadczenia na naszej stronie. Możesz dostosować swoje preferencje poniżej.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Niezbędne</h4>
                <p className="text-sm text-muted-foreground">
                  Pliki cookie niezbędne do działania strony.
                </p>
              </div>
              <Switch checked={preferences.necessary} disabled />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Funkcjonalne</h4>
                <p className="text-sm text-muted-foreground">
                  Pliki cookie poprawiające funkcjonalność strony.
                </p>
              </div>
              <Switch 
                checked={preferences.functional} 
                onCheckedChange={() => handleToggle("functional")} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Analityczne</h4>
                <p className="text-sm text-muted-foreground">
                  Pliki cookie używane do analizy ruchu na stronie.
                </p>
              </div>
              <Switch 
                checked={preferences.analytics} 
                onCheckedChange={() => handleToggle("analytics")} 
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Marketingowe</h4>
                <p className="text-sm text-muted-foreground">
                  Pliki cookie używane do celów marketingowych.
                </p>
              </div>
              <Switch 
                checked={preferences.marketing} 
                onCheckedChange={() => handleToggle("marketing")} 
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="mt-2 sm:mt-0"
            >
              Anuluj
            </Button>
            <Button onClick={acceptAll} className="bg-gingerbread hover:bg-gingerbread/90">
              Akceptuj wszystkie
            </Button>
            <Button onClick={savePreferences}>Zapisz preferencje</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieSettings;
