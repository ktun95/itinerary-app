import React, { useState, useEffect, useRef} from 'react'

const Editable = ({
    text, //an initial value, component uses renderText state to hold text value
    type,
    placeholder,
    children,
    style, 
    ...props
}) => {

    const [renderText, setRenderText] = useState(text)
    const [isEditing, setEditing] = useState(false)
    
    const inputRef = useRef(null)
    const wrapperRef = useRef(null)

    useEffect(() => {
        if (isEditing) inputRef.current.focus()
    })

    const useKeyDown = (targetKey, handler) => { //custom hook that adds event listener that first if the key pressed matches the key argument 

        const listener = ({key}) => {       
            if (key === targetKey) {
                handler()
            }
        }

        useEffect(() => {
            document.addEventListener('keydown', listener)

            return () => {
                document.removeEventListener('keydown', listener)
            }       
        }, [])
    }

    //if key press = enter/esc -> set isEditing to false... maybe blur() it too... 

    const useOnClickOutside = (ref, handler) => {
        useEffect(() => {

            const listener = (event) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                handler(event)
            }

            document.addEventListener('mousedown', listener)
            document.addEventListener('touchstart', listener)

            return () => {
                document.removeEventListener('mousedown', listener)
                document.removeEventListener('touchstart', listener)
            }
        }, [ref, handler])
    }

    const handleChange = (e) => {
        setRenderText(e.target.value)
    }

    useOnClickOutside(wrapperRef, () => {
        if (isEditing) {
            setEditing(false)
        }
    })

    useKeyDown('Enter', () => setEditing(false) )
    useKeyDown('Escape', () => setEditing(false) )

    return (
        <span className="inline-edit-text" ref={wrapperRef}>
            <span
                className={`inline-edit-display--${isEditing ? 'hidden' : 'active'}`}
                onDoubleClick={() => {
                    setEditing(true)
                }}
                >
                {renderText || 'Double Click to Edit Title'}
            </span>
            <input
                className={`inline-edit-input--${isEditing ? 'active' : 'hidden'}`}
                // style={{width: Math.ceil(renderText.length * 0.9) + 'ex'}}
                onBlur={() => setEditing(false)}
                onChange={handleChange}
                ref={inputRef}
                value={renderText}
            />
        </span>
    )
}

export default Editable
