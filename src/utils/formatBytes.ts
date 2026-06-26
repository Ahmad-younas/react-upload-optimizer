export function formatBytes(bytes:number ): string {
    if (bytes == 0) return "0 Bytes"; 
    const sizeUnits = ["Bytes", "KB", "MB", "GB"];
    const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = bytes / Math.pow(1024, unitIndex);
    return `${size.toFixed(2)} ${sizeUnits[unitIndex]}`;
}