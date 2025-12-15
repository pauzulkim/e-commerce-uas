const fs = require('fs');
const path = require('path');

// Files yang perlu dicek
const filesToCheck = [
  'src/components/Layout/Header.jsx',
  'src/components/Layout/Footer.jsx',
  'src/pages/Home.jsx',
  'src/pages/Products.jsx',
  'src/pages/ProductDetail.jsx',
  'src/pages/Cart.jsx',
  'src/pages/Checkout.jsx',
  'src/pages/Confirmation.jsx',
  'src/pages/About.jsx',
  'src/context/CartContext.jsx',
  'src/context/ProductContext.jsx',
  'src/App.jsx'
];

console.log('🔧 Fixing React imports...');

filesToCheck.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix: cek jika pakai useState/useEffect tapi ga diimport
    const usesState = content.includes('useState(') || content.includes('useState (');
    const usesEffect = content.includes('useEffect(') || content.includes('useEffect (');
    const usesRef = content.includes('useRef(') || content.includes('useRef (');
    const usesContext = content.includes('useContext(') || content.includes('useContext (');
    
    let updated = false;
    
    // Jika pakai hooks tapi import hanya 'react'
    if (content.includes("import React from 'react'") && (usesState || usesEffect || usesRef || usesContext)) {
      // Ganti dengan import yang benar
      let newImport = "import React, { ";
      const imports = [];
      
      if (usesState) imports.push('useState');
      if (usesEffect) imports.push('useEffect');
      if (usesRef) imports.push('useRef');
      if (usesContext) imports.push('useContext');
      
      newImport += imports.join(', ') + " } from 'react';";
      
      content = content.replace(
        /import React(?:, \{.*?\})? from 'react';/,
        newImport
      );
      updated = true;
    }
    
    // Jika tidak ada import React sama sekali (jarang terjadi)
    if (!content.includes("from 'react'") && !content.includes('from "react"')) {
      if (usesState || usesEffect) {
        content = "import React, { " + 
          (usesState ? 'useState' : '') + 
          (usesState && usesEffect ? ', ' : '') + 
          (usesEffect ? 'useEffect' : '') + 
          " } from 'react';\n" + content;
        updated = true;
      }
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed imports in ${filePath}`);
    }
  }
});

console.log('\n🎯 All imports fixed!');
console.log('👉 Run: npm run dev');