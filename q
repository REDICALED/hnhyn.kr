[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex df7b6878..11ad0c97 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -43,7 +43,7 @@[m
         "eslint-plugin-react-hooks": "^4.6.0",[m
         "eslint-plugin-react-refresh": "^0.4.5",[m
         "postcss": "^8.4.33",[m
[31m-        "tailwindcss": "^3.4.1",[m
[32m+[m[32m        "tailwindcss": "^3.4.3",[m
         "typescript": "^5.2.2",[m
         "vite": "^5.0.8",[m
         "vite-plugin-svgr": "^4.2.0",[m
[1mdiff --git a/package.json b/package.json[m
[1mindex ae28abb1..214c0483 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -45,7 +45,7 @@[m
     "eslint-plugin-react-hooks": "^4.6.0",[m
     "eslint-plugin-react-refresh": "^0.4.5",[m
     "postcss": "^8.4.33",[m
[31m-    "tailwindcss": "^3.4.1",[m
[32m+[m[32m    "tailwindcss": "^3.4.3",[m
     "typescript": "^5.2.2",[m
     "vite": "^5.0.8",[m
     "vite-plugin-svgr": "^4.2.0",[m
[1mdiff --git a/postcss.config.js b/postcss.config.js[m
[1mindex 2e7af2b7..b4a6220e 100644[m
[1m--- a/postcss.config.js[m
[1m+++ b/postcss.config.js[m
[36m@@ -4,3 +4,4 @@[m [mexport default {[m
     autoprefixer: {},[m
   },[m
 }[m
[41m+[m
[1mdiff --git a/src/pages/AdminPage.tsx b/src/pages/AdminPage.tsx[m
[1mindex 7ba39cac..4187462d 100644[m
[1m--- a/src/pages/AdminPage.tsx[m
[1m+++ b/src/pages/AdminPage.tsx[m
[36m@@ -191,8 +191,8 @@[m [mconst App = () => {[m
           </div>[m
         </div>[m
         <div className="flex justify-center w-[45vw]">[m
[31m-          <button onClick={()=>{fileCreate(repo, path, contents, tags, imageuploaded , titleimageuploaded, untitled, setFileRequire, setTitleRequire, setFileBlock );[m
[31m-          [m
[32m+[m[32m          <button onClick={()=>{[m
[32m+[m[32m            fileCreate(repo, path, contents, tags, imageuploaded , titleimageuploaded, untitled, setFileRequire, setTitleRequire, setFileBlock );[m
             SetGitMainImage([]);[m
             SetModifyProjectTitle([]);[m
           }} type="button" className=" transition-all duration-300 mt-[1vh] mr-[1vw] min-w-[19vw] max-w-[20vw] min-h-[10vh] max-h-[10vh] text-gray-900 bg-white hover:bg-gray-200 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg text-center inline-flex items-center">[m
