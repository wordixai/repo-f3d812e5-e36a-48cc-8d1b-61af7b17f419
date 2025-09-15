import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TodoItem from './TodoItem';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
      setTodos(parsedTodos);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen todo-container flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="glass-effect shadow-2xl border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white mb-2">
              我的待办事项
            </CardTitle>
            <p className="text-white/80">
              {totalCount > 0 ? `已完成 ${completedCount}/${totalCount} 项任务` : '开始添加你的第一个任务'}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Todo Input */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="添加新任务..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
              />
              <Button
                onClick={addTodo}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 transition-all duration-200"
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Todo List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {todos.length === 0 ? (
                <div className="text-center py-8 text-white/60">
                  <p className="text-lg">还没有任务</p>
                  <p className="text-sm">添加一个任务开始管理你的待办事项</p>
                </div>
              ) : (
                todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onEdit={editTodo}
                    onDelete={deleteTodo}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodoList;