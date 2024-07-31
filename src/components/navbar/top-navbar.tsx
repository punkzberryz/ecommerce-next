import { ThemeToggleButton } from "../providers/theme-toggle-button";
import { TopAuthNav } from "./top-auth-nav";
import { TopNavShoppingCart } from "./top-nav-shopping-cart";

export const TopNavbar = () => {
  return (
    <div className="hidden items-center justify-between space-x-4 bg-primary px-4 py-2 text-primary-foreground md:flex">
      <TopAuthNav />
      <div className="flex items-center space-x-2">
        <ThemeToggleButton />
        <TopNavShoppingCart />

        <div>Phone / FB / Line</div>
      </div>
    </div>
  );
};
