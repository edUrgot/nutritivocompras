import type { PropsWithChildren } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoNutritivoPath } from "@/assets/logoNutritivo";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Nueva compra" },
  { to: "/compare", label: "Comparativo" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/settings", label: "Configuración" }
];

export function AppShell({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-slate-200 bg-brand-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <img src={logoNutritivoPath} alt="Nutritivo Chile" className="h-12 w-12 rounded-xl bg-white/10 p-1" />
            <div>
              <p className="text-xl font-bold">Compras Nutritivo Chile</p>
              <p className="text-sm text-brand-100">Operación diaria, comparativos y dashboard</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2">
            {links.map((link) =>
              link.to === "/" ? (
                <button
                  key={link.to}
                  type="button"
                  onClick={() => navigate("/", { state: { resetToken: Date.now() } })}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition",
                    location.pathname === "/" ? "bg-white text-brand-900" : "bg-white/10 text-white hover:bg-white/20"
                  )}
                >
                  {link.label}
                </button>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition",
                      isActive ? "bg-white text-brand-900" : "bg-white/10 text-white hover:bg-white/20"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">{children}</main>
    </div>
  );
}
