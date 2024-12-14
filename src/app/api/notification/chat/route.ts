import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notices = await prisma.chatNotice.findMany({
        where: {
            userId: session?.user?.id
        }
    });

    return NextResponse.json(notices);

  } catch (error) {
    console.error("Failed to fetch notices:", error);
    return NextResponse.json(
      { error: "Failed to fetch notices" },
      { status: 500 }
    );
  }
}


export async function DELETE(request: NextRequest) {
    try {
        console.log('ddddddddddddddddddddddd');
        console.log('ddddddddddddddddddddddd');
      // Extract the notification ID from the URL search params
      const { searchParams } = new URL(request.url);
      const notificationId = searchParams.get('id');

      console.log('iiiiiiiiiiiiiiiiiii');
      console.log('iiiiiiiiiiiiiiiiiii');
      console.log('sean_log notificationId: ' + notificationId);
  
      // Validate the notification ID
      if (!notificationId) {
        return NextResponse.json(
          { error: 'Notification ID is required' }, 
          { status: 400 }
        );
      }
  
      // Convert notificationId to integer
      const id = parseInt(notificationId, 10);
  
      console.log('pppppppppppppppppp');
      console.log('pppppppppppppppppp');
      console.log('sean_log id: ' + id);
      // Delete the specific chat notice
      await prisma.chatNotice.delete({
        where: { id }
      });
  
      // Return successful response
      return NextResponse.json(
        { message: 'Notification deleted successfully' }, 
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
  
      // Handle specific Prisma not found error
      if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
        return NextResponse.json(
          { error: 'Notification not found' }, 
          { status: 404 }
        );
      }
  
      // Generic error handling
      return NextResponse.json(
        { error: 'Failed to delete notification' }, 
        { status: 500 }
      );
    }
  }