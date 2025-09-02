import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getTodos = query({
  args: {},
  handler: async (context: any) => {
    const todos = await context.db.query("todos").order("desc").collect();
    return todos;
  },
});

export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (context: any, args: { text: string }) => {
    const todoId = await context.db.insert("todos", {
      text: args.text,
      isCompleted: false,
    });
    return todoId;
  },
});

export const ToggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (context: any, args: { id: string }) => {
    const todo = await context.db.get(args.id);
    if (!todo) throw new ConvexError("Todo not found");

    await context.db.patch(args.id, {
      isCompleted: !todo.isCompleted,
    });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (context: any, args: { id: string }) => {
    const todo = await context.db.get(args.id);
    if (!todo) throw new ConvexError("Todo not found");

    await context.db.delete(args.id);
  },
});

export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    text: v.string(),
  },
  handler: async (context: any, args: { id: string; text: string }) => {
    await context.db.patch(args.id, {
      text: args.text,
    });
  },
});

// ✅ Fixed clearAllTodos
export const clearAllTodos = mutation({
  handler: async (context: any) => {
    const todos = await context.db.query("todos").collect();

    // Use _id, not id
    for (const todo of todos) {
      await context.db.delete(todo._id);
    }

    return { deleteCount: todos.length };
  },
});
