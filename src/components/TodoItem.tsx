import React, { useState } from 'react';
import { Check, X, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Todo } from './TodoList';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  const handleEdit = () => {
    if (editValue.trim() !== '') {
      onEdit(todo.id, editValue.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-3 p-4 rounded-lg bg-white/10 border border-white/20 transition-all duration-300 hover:bg-white/15",
      todo.completed && "opacity-75"
    )}>
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="border-white/40 data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
      />

      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
            autoFocus
          />
          <Button
            onClick={handleEdit}
            size="sm"
            className="bg-green-500/20 hover:bg-green-500/30 text-green-100 border-green-400/30"
          >
            <Check className="h-3 w-3" />
          </Button>
          <Button
            onClick={handleCancel}
            size="sm"
            variant="ghost"
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <>
          <span className={cn(
            "flex-1 text-white transition-all duration-200",
            todo.completed && "line-through opacity-60"
          )}>
            {todo.text}
          </span>
          <div className="flex gap-1 opacity-60 hover:opacity-100 transition-opacity">
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              onClick={() => onDelete(todo.id)}
              size="sm"
              variant="ghost"
              className="text-red-300 hover:text-red-100 hover:bg-red-500/20 h-8 w-8 p-0"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;