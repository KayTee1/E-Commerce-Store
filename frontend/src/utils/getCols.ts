export const getCols = (length: number, screenSize: string) => {
    let cols;
    if (length > 3) {
      cols = 3;
    } else {
      cols = length;
    }
    let gridStyle;
    switch (screenSize) {
    case "lg":
        gridStyle = `lg:grid-cols-${cols} md:grid-cols-${cols-1} sm:grid-cols-${1}`;
        break;
    case "md":
        gridStyle = `md:grid-cols-${cols-1} sm:grid-cols-${1}`;
        break; 
    case "sm":
        gridStyle = `sm:grid-cols-${1}`;
        break;
    default:
        gridStyle = `grid-cols-${cols}`;
    }
    return gridStyle;
  };
  