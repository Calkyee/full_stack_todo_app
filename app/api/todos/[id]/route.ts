import { 
  NextResponse 
} from "next/server";

import { 
  DbService
} from "@/server/services/db-service"; 

import { 
  UpdateTodoPayload 
} from "@/types";

import { 
  headers 
} from "next/headers";

import { 
  auth 
} from "@/lib/auth";

import { 
  TodoService
} from "@/server/services/todo-service/todo.service"; 

/**
 * =================================
 * GET /api/todos/[id]
 *
 * Fetches a single todo by its ID.
 * =================================
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthenticated." }, { status: 401 });
  }

  const dbService = new DbService(); 
  const client = await dbService.getDatabase(); 

  try {
    const todo = await client.todo.findUnique({
      where: { id: params.id },
      include: {
        category: true,
      },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Failed to fetch todo:", error);
    return NextResponse.json(
      { error: "Failed to fetch todo" },
      { status: 500 },
    );
  }
}

/**
 * =================================
 * PUT /api/todos/[id]
 *
 * Updates an existing todo.
 * =================================
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthenticated." }, { status: 401 });
  }
  try {
    const dbService = new DbService(); 
    const client = await dbService.getDatabase(); 

    const { id } = await params;
    const { completed } = await request.json();
    const updatedTodo = await client.todo.update({
      where: { id },
      data: {
        // categoryId,
        // priority,
        completed,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error("Failed to update todo:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 },
    );
  }
}

/**
 * =================================
 * DELETE /api/todos/[id]
 *
 * Deletes a todo by its ID.
 * =================================
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  const dbService = new DbService(); 
  const client = await dbService.getDatabase();

  if (!session) {
    return NextResponse.json({ error: "Unauthenticated." }, { status: 401 });
  }
  try {
    const { id } = await params;

    await client.todo.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error("Failed to delete todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 },
    );
  }
}
