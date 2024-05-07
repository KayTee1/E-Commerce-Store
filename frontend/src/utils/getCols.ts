export const getCols = (length: number, screenSize: string): string => {
  const MAX_COLS = 3;
  if (length > MAX_COLS) {
    length = 3;
  }

  let gridStyle;
  switch (screenSize) {
    case "lg":
      gridStyle = `lg:grid-cols-${length} md:grid-cols-${length} sm:grid-cols-${length}`;
      break;
    case "md":
      gridStyle = `grid-cols-${length >= 2 ? 2 : 1}`;
      break;
    case "sm":
      gridStyle = `grid-cols-${1}`;
      break;
    default:
      gridStyle = `grid-cols-${length}`;
  }
  return gridStyle;
};
