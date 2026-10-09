const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public/assets/001');

fs.readdir(dir, (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  // Filter for webp frames
  const frames = files.filter(f => f.startsWith('frame_') && f.endsWith('.webp'));
  
  // Sort them to ensure 000 comes before 001
  // The existing naming frame_000, frame_001 sorts naturally alphabetically if fixed width, 
  // but let's be safe and sort by the number extracted.
  frames.sort((a, b) => {
    const numA = parseInt(a.match(/frame_(\d+)/)[1]);
    const numB = parseInt(b.match(/frame_(\d+)/)[1]);
    return numA - numB;
  });

  console.log(`Found ${frames.length} frames.`);

  frames.forEach((file, index) => {
    // Target: frame_0001.webp (1-based index to match my code's default, or 0-based?)
    // My code used 1-based index loop: for (let i = 1; i <= totalFrames; i++)
    // So let's map frame_000 -> frame_0001.webp
    
    const newName = `frame_${String(index + 1).padStart(4, '0')}.webp`;
    const oldPath = path.join(dir, file);
    const newPath = path.join(dir, newName);

    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
    }
  });

  console.log('Renaming complete.');
});
