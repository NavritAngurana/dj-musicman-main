import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Gamepad2, Dumbbell, Coffee, Moon, PartyPopper } from "lucide-react";

interface ActivitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const activities = [
  { value: "study", label: "Study", icon: BookOpen },
  { value: "gaming", label: "Gaming", icon: Gamepad2 },
  { value: "fun", label: "fun", icon: PartyPopper },
];

const ActivitySelector = ({ value, onChange }: ActivitySelectorProps) => {
  const currentActivity = activities.find((a) => a.value === value);
  const Icon = currentActivity?.icon || BookOpen;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48 bg-card/80 border-border/50 backdrop-blur-sm hover:bg-card transition-colors">
        <div className="flex items-center gap-2">
          <SelectValue placeholder="Select activity" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-card border-border/50 backdrop-blur-xl">
        {activities.map((activity) => {
          const ActivityIcon = activity.icon;
          return (
            <SelectItem 
              key={activity.value} 
              value={activity.value}
              className="cursor-pointer hover:bg-primary/10"
            >
              <div className="flex items-center gap-2">
                <ActivityIcon className="h-4 w-4 text-primary" />
                <span>{activity.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default ActivitySelector;