import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from 'react'
import PostForm from './PostForm'
import { createPostAction } from '@/actions/post.action'

function PostDialog({modalName, setModalName}: any) {
  return (
    <>
        <Dialog open={modalName} onOpenChange={setModalName}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create a post
                    </DialogTitle>
                </DialogHeader>
                <PostForm action={createPostAction} setModalName={setModalName} />
            </DialogContent>
        </Dialog>
    </>
  )
}

export default PostDialog