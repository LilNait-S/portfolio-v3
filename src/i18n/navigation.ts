import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Wrappers de <Link>, useRouter, etc. que respetan el locale actual.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
