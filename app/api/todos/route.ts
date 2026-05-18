import { 
  NextResponse 
} from "next/server";

import { 
  DbService
} from "@/server/services/db-service"; 

import { 
  CreateTodoPayload 
} from "@/types";

import { 
  auth 
} from "@/lib/auth";

import { 
  headers 
} from "next/headers";

/**
 * =================================
 * GET /api/todos
 *
 * Fetches all todos from the database.
 * =================================
 */
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthenticated." }, { status: 401 });
  }
  try {
    const dbService = new DbService(); 
    const client = await dbService.getDatabase(); 

    const todos = await client.todo.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true, // Include category details if they exist
      },
    });

    const newTodos = await client.todo.findMany({
      where: { userId: session.user.id },
    });
    return NextResponse.json(newTodos);
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 },
    );
  }
}

/**
 * =================================
 * POST /api/todos
 *
 * Creates a new todo.
 * =================================
 */
export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthenticated." }, { status: 401 });
  }
  try {
    const dbService = new DbService(); 
    const client = await dbService.getDatabase(); 

    // Note: In a real app, you'd get the userId from the session.
    // For now, we'll assume it's passed in the body for simplicity.
    const {
      content,
      categoryId,
      priority,
    }: CreateTodoPayload & { userId: string } = await request.json();

    const userId = session.user.id;

    if (!content || !userId) {
      return NextResponse.json(
        { error: "Content and userId are required fields" },
        { status: 400 },
      );
    }

    // check if todo already exists
    const todo = await client.todo.findFirst({
      where: {
        content,
        userId,
      },
    });

    if (todo) {
      return NextResponse.json(
        { error: "Todo already exits" },
        { status: 409 },
      );
    }

    const newTodo = await client.todo.create({
      data: {
        content,
        userId,
        categoryId,
        priority,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Failed to create todo:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 },
    );
  }
}

/**
 * =================================
 * DELETE /api/todos
 *
 * Delete all completed todos
 * =================================
 */
export async function DELETE(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthenticated." }, { status: 401 });
  }
  try {
    const userId = session.user.id;

    const dbService = new DbService(); 
    const client = await dbService.getDatabase(); 

    // check if todo already exists
    const todos = await client.todo.deleteMany({
      where: {
        userId,
        completed: true,
      },
    });

    if (!todos) {
      return NextResponse.json(
        { error: "An unexpected error occurred clearing todos" },
        { status: 409 },
      );
    }

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error("Failed to delete todos:", error);
    return NextResponse.json(
      { error: "Failed to delete todos" },
      { status: 500 },
    );
  }
}
