// components/ClientErrorButton.js
"use client";

import { Button } from "@/components/ui/button";
import { useError } from "@/context/ErrorContext";

export default function ClientErrorButton() {
    const { showError } = useError();

    const fakeError = () => {
        try {
            throw new Error("Custom error message");
        } catch (error) {
            showError(error as Error);
        }
    };

    return <Button onClick={fakeError}>shadcnbutton</Button>;
}
