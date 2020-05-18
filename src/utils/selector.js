const $ = (target) => {
    const elements = document.querySelectorAll(target)
    return (elements.length > 1) ? elements : document.querySelector(target)
} 

export default $;