const isNotUnNull = (myvar) => {
    return (typeof(myvar) !== "undefined") && (myvar !== null); 
} 

export { isNotUnNull }