const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('page.tsx')) {
      results.push(file);
    }
  });
  return results;
}
const files = walk('c:/Users/Tanishq/Desktop/ecosphere/greenpluse/src/app');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('"use client"')) {
    content = content.replace(/export const dynamic = 'force-dynamic';\r?\n/g, '');
    content = content.replace(/export const revalidate = 0;\r?\n/g, '');
    
    // Now put them back after "use client";
    content = content.replace(/"use client";\r?\n/, '"use client";\nexport const dynamic = \'force-dynamic\';\nexport const revalidate = 0;\n');
    
    fs.writeFileSync(file, content);
  }
});
console.log('Fixed use client');
