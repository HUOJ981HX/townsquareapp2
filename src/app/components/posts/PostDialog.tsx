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

function PostDialog({isOpen, setIsOpen}: any) {
  return (
    <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create a post
                    </DialogTitle>
                </DialogHeader>
                <PostForm action={createPostAction} setIsOpen={setIsOpen} />
            </DialogContent>
        </Dialog>
    </>
  )
}

export default PostDialog