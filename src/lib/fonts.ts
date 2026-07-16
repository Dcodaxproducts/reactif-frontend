type FontClass = {
  className: string;
  variable: string;
};

const createLocalFontClass = (variable: string): FontClass => ({
  className: "font-hk",
  variable,
});

// The project already ships its customer-facing typography through globals.css.
// Keeping these exports local avoids build-time dependency on Google Fonts while
// preserving the previous import contract used by the layout/components.
export const onest = createLocalFontClass("--font-onest");
export const barlow = createLocalFontClass("--font-barlow");
export const poppins = createLocalFontClass("--font-poppins");
export const arimo = createLocalFontClass("--font-arimo");
