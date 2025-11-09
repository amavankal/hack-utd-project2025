//import React from 'react';

// creates function called NavBar
function InstructionComponent() {
    // returns a HTML tag, with 1 HTML element
    return (
        <>
            <div className=" text-white max-w-2xl mx-auto my-6 p-4 border-2 bg-[#4f772d] border-[#31572c] rounded-xl">
                <h2 className="text-xl font-semibold">
                    Instructions:
                </h2>
                   
                <p className="leading-relaxed">
                    Please enter your monthly spending habits. 
                    You can add more expenses if you want. Please also input 
                    whether this expense is a want or a need. We will use your inputs
                    to help you understand your saving habits better. 

                    Whenever you update the table please click the generate results button again for up to date results. 
                </p>
            </div>
        </>
    );
}

// make NavBar available to other classes
export default InstructionComponent;