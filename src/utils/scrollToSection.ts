/** Scroll to the visible section heading, accounting for the fixed navbar. */
export function scrollToSection(hash: string, behavior: ScrollBehavior = 'smooth'): void {
  const section = document.querySelector(hash);
  if (!section) return;
  const heading = section.querySelector('h1, h2') ?? section;
  const navbar = document.querySelector('nav.fixed');
  const navbarHeight = navbar?.getBoundingClientRect().height ?? 64;
  const targetY = heading.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
  window.scrollTo({ top: Math.max(0, targetY), behavior });
}
