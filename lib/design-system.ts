const DISABLEABLE_STYLE = "disabled:cursor-not-allowed disabled:opacity-50";

export const DS = {
  layout: {
    pageWrapper: "min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-gray-200",
    mainContent: "flex-1 max-w-5xl mx-auto w-full",
    sectionHeader: "flex justify-between items-start mb-10",
  },

  card: {
    base: "bg-white border border-gray-200 rounded-xl",
    hoverable: "transition-shadow hover:shadow-md",
    glass: "bg-white/50 backdrop-blur-sm border-t border-gray-200",
    floating: "rounded-lg p-4 shadow-xl outline-none"
  },

  text: {
    h1: "text-3xl font-bold tracking-tight text-gray-900",
    h4: "text-sm font-medium text-gray-900",
    h4Muted: "text-sm font-medium text-gray-500",
    body: "text-sm text-gray-800 leading-relaxed",
    muted: "text-xs font-medium text-gray-500",
    label: "text-xs font-medium text-gray-500 uppercase tracking-wider",
  },

  button: {
    base: `inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${DISABLEABLE_STYLE}`,
    primary: "bg-gray-900 text-white hover:bg-gray-800", //shadow-sm
    secondary: "bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-gray-200",
    ghost: "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
    loading: "bg-gray-100 text-gray-400",
    icon: "p-2 rounded-md transition-colors",
  },

  input: {
    base: "w-full text-base text-gray-900 placeholder:text-gray-400 font-normal leading-relaxed",
    textarea: "resize-none outline-none",
    wrapper: "focus-within:ring-1 focus-within:ring-gray-200 transition-shadow",
  },

  feedback: {
    progressTrack: "relative h-2 w-full overflow-hidden rounded-full bg-gray-100",
    progressIndicator: "h-full w-full bg-gray-900 transition-all duration-500 ease-in-out",
  },

  avatar: {
    base: "relative inline-block overflow-hidden rounded-full bg-gray-200 border border-gray-300 shrink-0",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  },

  utils: {
    divider: "h-px bg-gray-200 w-full",
    dividerVertical: "h-4 w-px bg-gray-200",
    focusRing: "focus:outline-none focus:ring-1 focus:ring-gray-200",
    center: "flex items-center justify-center",
    disableable: "disabled:cursor-not-allowed disabled:opacity-50"
  },
};
