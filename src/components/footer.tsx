export default function Footer() {
  return (
    <footer className="mt-auto px-6 py-4 text-center text-sm text-muted-foreground bg-white dark:bg-neutral-900">
      © {new Date().getFullYear()} Stream Portal. All rights reserved.
    </footer>
  );
}
