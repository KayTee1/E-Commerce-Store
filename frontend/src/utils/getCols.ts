export const getCols = (length: number, screenSize: string) => {
    if(length > 3){
        length = 3;
    }  

    let gridStyle;
    switch (screenSize) {
    case "lg":
        gridStyle = `lg:grid-cols-${length} md:grid-cols-${length >= 2 ? 2:1}`;
        break;
    case "md":
        gridStyle = `md:grid-cols-${length >= 2 ? 2:1}`;
        break; 
    case "sm":
        gridStyle = `sm:grid-cols-${1}`;
        break;
    default:
        gridStyle = `grid-cols-${length}`;
    }
    return gridStyle;
  };
  