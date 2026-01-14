
import { ReactNode } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/Popover";
import { Badge } from "./ui/Badge";
 import { Resource, resourceTypeMeta } from "../Type";
import { cn } from "./ui/utils";

interface ResourceListPopoverProps {
  trigger: ReactNode;
  title: string;
  type?: string;
  resources: Resource[]
}

export function ResourceListPopover({
  trigger,
  title,
  type,
  resources,
}: ResourceListPopoverProps) {
  // Reużyj ikony z resourceTypeMeta
 
  const meta = resourceTypeMeta[type === "machine" ? "machines" : "devices"];
  const Icon = meta.icon;
  const iconColor = meta.iconColor;
  const bgColor = meta.bg;

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent 
        className="w-72 max-h-80 overflow-y-auto p-0" 
        align="start"
        side="bottom"
      >
        <div className="p-3 border-b bg-muted/50">
          <h4 className="font-semibold flex items-center gap-2 text-sm">
            <span className={cn("h-4 w-4", iconColor)}>{Icon}</span>
            {title}
          </h4>
        </div>
        <div className="p-2 space-y-1">
          {resources.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex items-center justify-between rounded-md p-2",
                bgColor
              )}
            >
              <div className="flex items-center gap-2">
                  <span className={cn("h-4 w-4", iconColor)}>{Icon}</span>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.type}</p>
                </div>
              </div>
              <Badge variant="secondary">
                {item.type}
              </Badge>
            </div>
          ))}
          {resources.length === 0 && (
            <p className="text-center text-muted-foreground py-4 text-sm">
              No {type}s assigned
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
