export function checkHeading(str) {
    // Check if string starts with ** (bold) or * (heading markers)
    return /^\*{1,2}/.test(str.trim())
}