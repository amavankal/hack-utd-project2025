// import React from 'react'
// import { useState } from 'react'; // useState function

function ToggleButton({
    id, checked, onChange,
} : {
    id: string,
    checked: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <>
            <label id={id} className="switch">
                <input type="checkbox" id={id} checked={checked} onChange={onChange}/>
                <span className="slider round"></span>
            </label>
        </>
    );
}

export default ToggleButton;