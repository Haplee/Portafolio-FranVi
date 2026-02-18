export default function Footer() {
    return (
        <footer className="py-8 bg-slate-950 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} Fran Vidal. Todos los derechos reservados.
            </p>
            <p className="mt-2 text-xs text-slate-600">
                Hecho con <span className="text-red-500">❤</span> usando React y Tailwind
            </p>
        </footer>
    );
}
