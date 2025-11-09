//import React from 'react';

// creates function called NavBar
function Title() {
    // returns a HTML tag, with 1 HTML element
    return (
        <>
            <div className="flex flex-col items-center justify-center mt-3 text-5xl font-semibold mb-2"> 
                <h1>Budget Helper </h1> 
            </div>
        </>
    );
}

// make NavBar available to other classes
export default Title;