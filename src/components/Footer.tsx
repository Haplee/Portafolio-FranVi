import { cn } from "@/lib/utils";

export default function Footer() {
    return (
        <footer className="py-8 bg-background border-t border-border text-center">
            <p className={cn("text-muted-foreground text-sm")}>
                &copy; {new Date().getFullYear()} Fran Vidal. All rights reserved.
            </p>
            <p className="mt-2 text-xs opacity-50">
                Diseñado con <span className="text-red-500">❤</span> usando React & Tailwind
            </p>
        </footer>
    );
}
