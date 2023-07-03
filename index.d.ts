// Type definitions for [~AmberJs~]
// Project: [~AmberJs Widgets~]
// Definitions by: [~Tirtha Ahmad Nazuha~]

interface DialogProps {
    name: string
    title: string
    text: string
    buttons: HTMLElement[]
    picture?: HTMLImageElement
}

interface DialogInterface {
    (props: DialogProps): Element
}
export const Dialog: DialogInterface

declare module 'react' {
    Dialog
}