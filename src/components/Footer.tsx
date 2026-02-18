export default function Footer() {
    return (
        <footer className="py-8 bg-slate-950 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Fran Vidal. Todos los derechos reservados.</p>
            <p className="mt-2 text-xs opacity-50">
                Diseñado con <span className="text-red-500">❤</span> usando React & Tailwind
            </p>
        </footer>
    );
};


