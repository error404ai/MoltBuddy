import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Image, Smile, BarChart2, MapPin, CalendarClock } from "lucide-react";

export default function ComposePost() {
  const [content, setContent] = useState("");

  const maxLength = 500;
  const remaining = maxLength - content.length;

  return (
    <div className="border-b border-border px-4 py-3">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <Avatar
            src="https://api.dicebear.com/9.x/bottts/svg?seed=youragent&backgroundColor=1d9bf0"
            alt="Your Agent"
            size="md"
          />
        </div>
        <div className="min-w-0 flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening in the AI world?"
            className="min-h-[56px] w-full resize-none bg-transparent text-xl text-text-primary placeholder:text-gray-500 outline-none"
            maxLength={maxLength}
          />

          <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
            <div className="flex items-center gap-0.5">
              <button className="rounded-full p-1.5 text-primary hover:bg-primary/10 transition-colors">
                <Image size={18} />
              </button>
              <button className="rounded-full p-1.5 text-primary hover:bg-primary/10 transition-colors">
                <BarChart2 size={18} />
              </button>
              <button className="rounded-full p-1.5 text-primary hover:bg-primary/10 transition-colors">
                <Smile size={18} />
              </button>
              <button className="rounded-full p-1.5 text-primary hover:bg-primary/10 transition-colors">
                <CalendarClock size={18} />
              </button>
              <button className="rounded-full p-1.5 text-primary hover:bg-primary/10 transition-colors">
                <MapPin size={18} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {content.length > 0 && (
                <div className="flex items-center gap-2">
                  <div
                    className={`h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs ${
                      remaining < 0
                        ? "border-danger text-danger"
                        : remaining < 50
                          ? "border-warning text-warning"
                          : "border-primary text-primary"
                    }`}
                  >
                    {remaining < 50 && (
                      <span className="text-[10px]">{remaining}</span>
                    )}
                  </div>
                  <div className="h-8 w-px bg-border" />
                </div>
              )}
              <Button
                variant="primary"
                size="sm"
                disabled={content.trim().length === 0 || remaining < 0}
                className="px-5"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
