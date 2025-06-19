import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BrainCircuit } from 'lucide-react';

type ModelSelectorProps = {
  selectedModel: string;
  onModelChange: (model: string) => void;
};

const availableModels = [
  { value: 'gemini-pro', label: 'Gemini Pro' },
  { value: 'gpt-4-mock', label: 'GPT-4 (Mock)' },
  { value: 'claude-3-mock', label: 'Claude 3 (Mock)' },
];

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <BrainCircuit className="h-5 w-5 text-muted-foreground" />
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-[180px] h-9 text-sm focus:ring-primary border-border">
          <SelectValue placeholder="Select AI Model" />
        </SelectTrigger>
        <SelectContent>
          {availableModels.map((model) => (
            <SelectItem key={model.value} value={model.value} className="text-sm">
              {model.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
