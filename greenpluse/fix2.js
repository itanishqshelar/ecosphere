const fs = require('fs');
const files = [
  'C:/Users/Tanishq/Desktop/ecosphere/greenpluse/src/app/ai/page.tsx',
  'C:/Users/Tanishq/Desktop/ecosphere/greenpluse/src/app/auth/forgot-password/page.tsx',
  'C:/Users/Tanishq/Desktop/ecosphere/greenpluse/src/app/auth/login/page.tsx',
  'C:/Users/Tanishq/Desktop/ecosphere/greenpluse/src/app/auth/register/page.tsx',
  'C:/Users/Tanishq/Desktop/ecosphere/greenpluse/src/app/auth/reset-password/page.tsx',
  'C:/Users/Tanishq/Desktop/ecosphere/greenpluse/src/app/auth/verify/page.tsx',
  'C:/Users/Tanishq/Desktop/ecosphere/greenpluse/src/app/auth/welcome/page.tsx',
  'C:/Users/Tanishq/Desktop/ecosphere/greenpluse/src/app/settings/page.tsx'
];
files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('"use client"')) {
    content = content.replace(/export const dynamic = 'force-dynamic';\r?\n/g, '');
    content = content.replace(/export const revalidate = 0;\r?\n/g, '');
    content = '"use client";\n' + content;
    fs.writeFileSync(file, content);
  }
});
console.log('Fixed client pages');
