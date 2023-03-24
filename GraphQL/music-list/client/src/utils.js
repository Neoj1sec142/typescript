export const findById = (array, targetId) => array.find(obj => obj.id === targetId) || null;

export const time2Duration = (time) => {
    const [hours, minutes, seconds] = time.split(':');
    const duration = `PT${hours}H${minutes}M${seconds || '00'}S`;
    return duration;
}