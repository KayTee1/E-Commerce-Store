export const getCols = (length: number, screenSize: string) => {
    const MAX_COLS = 3;
    console.log("Length of productsData:", length);
    console.log("Screen size:", screenSize);
    if(length > MAX_COLS){
        length = 3;
    }  

    let gridStyle;
    switch (screenSize) {
    case "lg":
        console.log("Switch case lg")
        gridStyle = `grid lg:grid-cols-${length} md:grid-cols-${length}`;
        break;
    case "md":
        gridStyle = `grid-cols-${length >= 2 ? 2:1}`;
        break; 
    case "sm":
        gridStyle = `grid-cols-${1}`;
        break;
    default:
        gridStyle = `grid-cols-${length}`;
    }
  

    console.log("Final Grid Style:",gridStyle)
    return gridStyle;
  };
  