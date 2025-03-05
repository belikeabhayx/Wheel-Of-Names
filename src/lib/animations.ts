
export const getRandomDelay = (min = 0, max = 1000) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomDuration = (min = 300, max = 700) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateSpinAnimation = (currentRotation: number, spinCount = 5) => {
  // Generate a random final position (0-360 degrees)
  const randomFinalAngle = Math.floor(Math.random() * 360);
  
  // Calculate total rotation (multiple full rotations + random final position)
  const fullRotations = 360 * spinCount;
  const totalRotation = fullRotations + randomFinalAngle;
  
  // Add the current rotation to get the absolute position
  return currentRotation + totalRotation;
};

export const calculateWinnerIndex = (rotation: number, entryCount: number) => {
  // Normalize rotation to 0-360 range
  const normalizedRotation = rotation % 360;
  
  // Calculate the segment size in degrees
  const segmentSize = 360 / entryCount;
  
  // Calculate which segment is at the pointer position (top)
  // Note: This depends on how your wheel is set up and which direction it spins
  let winnerIndex = Math.floor(normalizedRotation / segmentSize);
  
  // Adjust based on wheel orientation (if needed)
  winnerIndex = entryCount - 1 - winnerIndex;
  
  // Ensure the index is within bounds
  return winnerIndex % entryCount;
};
